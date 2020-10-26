
import torch
import numpy as np
from time import time
import os

from sklearn.metrics import log_loss
from torch.utils.data import Dataset, DataLoader, ChainDataset

from server.model.dataset import MovieLens
from server.model.metadata import Metadata
from server.model.network import FPNet
from server.model.utilities import get_device, push_to_device

from tqdm import tqdm

device = get_device()


def evaluate_model(model: FPNet, dataset: Dataset):
    """
    Evaluate model accuracy over the test dataset.
    :param model:
    :param dataset:
    :return:
    """
    y_real: [float] = []
    y_pred: [float] = []
    for inputs in dataset:
        rating = inputs['rating']
        inputs = {
            'user_id': torch.tensor([inputs['user_id']], dtype=torch.int64),
            'movie_id': torch.tensor([inputs['movie_id']], dtype=torch.int64),
        }

        if device.type == 'cuda':
            inputs = push_to_device(inputs, device)

        predict = model.predict(inputs)
        predict = predict[0][0]

        y_real.append(rating)
        y_pred.append(predict)

    y_real = np.array(y_real, dtype=float)
    y_pred = np.array(y_pred, dtype=float)

    # TODO: Implement NDCG scoring
    return log_loss(y_real, y_pred)


def train_model(output_folder: str, output_name: str):
    """
    Train the model.
    :param output_folder: Output folder path
    :param output_name: Name of output model name
    :return:
    """
    print(f'Running FlickPick model on {device}.')

    meta_data = Metadata('dataset/processed/100k')
    train_data = ChainDataset([
        MovieLens('dataset/processed/100k', 'ratings_train_pos.csv'),
        MovieLens('dataset/processed/100k', 'ratings_train_neg.csv')
    ])
    train_gen = DataLoader(train_data, batch_size=256, num_workers=0)

    test_data = ChainDataset([
        MovieLens('dataset/processed/100k', 'ratings_test_pos.csv'),
        MovieLens('dataset/processed/100k', 'ratings_test_neg.csv')
    ])

    train_samples = 0
    for _ in train_data:
        train_samples += 1
    test_samples = 0
    for _ in train_data:
        test_samples += 1

    num_users = meta_data.n_users
    num_movies = meta_data.n_movies

    model = FPNet(num_users, num_movies)
    # we're using binary-cross entropy; which has been noted to be good for this
    loss_fn = torch.nn.BCELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=0.001)

    total_epochs = 30
    for current_epoch in range(1, total_epochs + 1):
        print('-'*50)
        print(f'Beginning epoch {current_epoch}')
        print('-'*50)

        t0 = time()
        train_losses: [float] = []

        model.train()

        # actual model training
        for inputs in tqdm(train_gen, total=train_samples//train_gen.batch_size):
            if device.type == 'cuda':
                inputs = push_to_device(inputs, device)

            # forward pass
            prediction = model(inputs)

            # get the target values
            y = inputs['rating']
            # convert to float and match dim
            y = y.float().view(prediction.size())

            # calculate loss for this input
            loss = loss_fn(prediction, y)

            # backwards pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            # accumulate the loss for monitoring
            train_losses.append(loss.item())

        print(f'Finished training epoch {current_epoch}')
        print('Beginning model evaluation')
        model.eval()
        epoch_accuracy = evaluate_model(model, test_data)

        # print epoch statistics
        train_loss = np.mean(train_losses)
        print(f"Training Loss: {train_loss}")
        print(f"Test Loss: {epoch_accuracy:.6f}")
        print(f"Epoch {current_epoch} completed {time() - t0:.1f}s")
        print()

    path = os.path.abspath(output_folder)
    os.makedirs(path, exist_ok=True)

    path = os.path.join(path, f"{output_name}.mdl")

    if os.path.exists(path):
        os.unlink(path)

    file_handle = open(path, 'wb')
    torch.save(model, file_handle)
    file_handle.close()

