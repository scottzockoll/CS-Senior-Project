
import torch
import numpy as np
from time import time
import os

from sklearn.metrics import log_loss
from torch.utils.data import DataLoader

from server.model.dataset import MovieLens
from server.model.network import FPNet
from server.model.utilities import get_device, push_to_device

device = get_device()


def evaluate_model(model: FPNet, dataset: MovieLens):
    """
    Evaluate model accuracy over the test dataset.
    :param model:
    :param dataset:
    :return:
    """
    y_real: [float] = []
    y_pred: [float] = []
    for idx in range(len(dataset.user_test)):
        user = dataset.user_test[idx]
        item = dataset.item_test[idx]
        rate = dataset.rate_test[idx]

        inputs = {
            'user_id': torch.tensor([user], dtype=torch.int64),
            'item_id': torch.tensor([item], dtype=torch.int64),
        }

        if device.type == 'cuda':
            inputs = push_to_device(inputs, device)

        predict = model.predict(inputs)
        predict = predict[0][0]

        y_real.append(rate)
        y_pred.append(predict)

    y_real = np.array(y_real, dtype=float)
    y_pred = np.array(y_pred, dtype=float)

    # TODO: Implement NDCG scoring
    return log_loss(y_real, y_pred, labels=[0, 1])


def train_model(output_folder: str, output_name: str):
    """
    Train the model.
    :param output_folder: Output folder path
    :param output_name: Name of output model name
    :return:
    """
    print(f'Running FlickPick model on {device}.')

    dataset = MovieLens('dataset', '100k')
    num_users, num_items = dataset.shape

    model = FPNet(num_users, num_items)
    generator = DataLoader(dataset, batch_size=256, shuffle=True, num_workers=0)
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
        for inputs in generator:
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
        epoch_accuracy = evaluate_model(model, dataset)

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

