import torch
import numpy as np
from time import time
import os

from torch.utils.data import DataLoader, ChainDataset

from sklearn.metrics import confusion_matrix

from server.model.dataset import MovieLens
from server.model.metadata import Metadata
from server.model.network import FPNet
from server.model.utilities import get_device, push_to_device

from tqdm import tqdm

device = get_device()


def evaluate_model(model: FPNet, test_gen: DataLoader, meta_data: Metadata):
    """
    Evaluate model accuracy over the test dataset.
    :param model: The model to evaluate.
    :param test_gen: The data loader to use to load testing data.
    :param meta_data: Meta data to use to calculate total length.
    :return:
    """
    model.eval()

    losses: [float] = []
    loss_fn = torch.nn.BCELoss()

    pred_y: [float] = []
    real_y: [float] = []

    pbar = tqdm(test_gen,
                total=meta_data.test_size // test_gen.batch_size,
                unit_scale=test_gen.batch_size,
                unit='sample',
                desc='Testing...')
    for inputs in pbar:
        if device.type == 'cuda':
            inputs = push_to_device(inputs, device)

        prediction = model(inputs)

        # get the target values
        y: torch.Tensor[float] = inputs['rating']

        # convert to float and match dim
        y = y.float().view(prediction.size())

        real_y.extend(torch.flatten(y).detach().numpy())
        pred_y.extend(torch.flatten(prediction).detach().numpy().round())

        loss = loss_fn(prediction, y)
        losses.append(loss.item())

    return np.mean(losses), confusion_matrix(real_y, pred_y)


def train_nn(output_folder: str, output_name: str, dataset_size: str, epochs: int = 5, lr: float = 1e-5):
    """
    Train the model.
    :param output_folder: Output folder path
    :param output_name: Name of output model name
    :param dataset_size: Size of the dataset to use.
    :param epochs: Number of passes through the data to do.
    :param lr: Learning rate to use.
    :return:
    """

    print(f'Running FlickPick model on {device}.')

    meta_data = Metadata(f'dataset/processed/{dataset_size}')
    train_data = ChainDataset([
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_train_pos.csv'),
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_train_neg.csv')
    ])
    train_gen = DataLoader(train_data, batch_size=256, num_workers=0)

    test_data = ChainDataset([
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_test_pos.csv'),
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_test_neg.csv')
    ])
    test_gen = DataLoader(test_data, batch_size=256, num_workers=0)

    num_users = meta_data.n_users
    num_movies = meta_data.n_movies

    path = os.path.abspath(output_folder)
    os.makedirs(path, exist_ok=True)

    model = FPNet(num_users, num_movies)
    # we're using binary-cross entropy; which has been noted to be good for this
    loss_fn = torch.nn.BCELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=lr, weight_decay=0.001)

    for current_epoch in range(1, epochs + 1):
        print('-' * 50)
        print(f'Beginning epoch {current_epoch}')
        print('-' * 50)

        t0 = time()
        train_losses: [float] = []

        model.train()

        # actual model training
        pbar = tqdm(train_gen,
                    total=meta_data.train_size // train_gen.batch_size,
                    unit_scale=train_gen.batch_size,
                    unit='sample')
        for inputs in pbar:
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
            pbar.set_description(f'Epoch {current_epoch} :: Loss {np.mean(train_losses):.04f}')

        print(f'Finished training epoch {current_epoch}')
        print('Beginning model evaluation')
        model.eval()
        test_loss, test_confusion = evaluate_model(model, test_gen, meta_data)
        tn, fp, fn, tp = test_confusion.ravel()

        test_precision = tn / (tn + fp)
        test_recall = tp / (tp + fn)

        # print epoch statistics
        train_loss = np.mean(train_losses)
        print('-' * 50)
        print(f"Training Loss: {train_loss}")
        print(f"Test Loss: {test_loss:.6f}")
        print(f"{'TN':>12}{'FP':>12}{'FN':>12}{'TP':>12}")
        print(f"{tn:>12}{fp:>12}{fn:>12}{tp:>12}")
        print(f"{'Precision':>24}{'Recall':>24}")
        print(f"{test_precision:>24}{test_recall:>24}")
        print(f"Epoch {current_epoch} completed {time() - t0:.1f}s")
        print('-' * 50)
        print()

        chkpt_path = os.path.join(path, "checkpoints", output_name)
        os.makedirs(chkpt_path, exist_ok=True)
        chkpt_path = os.path.join(chkpt_path, f"{output_name}-{current_epoch:04}.mdl")

        if os.path.exists(chkpt_path):
            os.unlink(chkpt_path)

        chkpt_handle = open(chkpt_path, 'wb')
        torch.save(model, chkpt_handle)
        chkpt_handle.close()

    path = os.path.join(path, f"{output_name}.mdl")

    if os.path.exists(path):
        os.unlink(path)

    file_handle = open(path, 'wb')
    torch.save(model, file_handle)
    file_handle.close()
