from server import app
import os

from server.model.candidates import train_mf
from server.model.train import train_nn
import argparse


def main():
    parser = argparse.ArgumentParser(description='FlickPick server.')
    parser.add_argument('--train-nn', action='store_true', help="Start the server in neural network training mode.")
    parser.add_argument('--train-mf', action='store_true', help="Start the server in candidate matrix training mode.")
    parser.add_argument('-d', '--dataset', type=str, help="Size of dataset.")
    parser.add_argument('-o', '--output', type=str, help='Name of output model to be saved.')
    parser.add_argument('--epochs', type=int, default=5, help='Number of passes through the data.')
    parser.add_argument('--l_rate', type=float, default=1e-5, help='Learning rate to use.')

    args = parser.parse_args()

    if args.train_nn or args.train_mf:
        if not args.output:
            raise ValueError('An output file must be specified in training mode.')
        if not args.dataset:
            raise ValueError('A dataset size must be specified in training mode.')

        assert args.dataset in ['100k', '25m'], 'Dataset size must be one of {100k, 25m}.'

        output_folder = os.path.join('model')
        output_folder = os.path.abspath(output_folder)
        os.makedirs(os.path.join(output_folder, 'nn'), exist_ok=True)
        os.makedirs(os.path.join(output_folder, 'mf'), exist_ok=True)

        if args.train_nn:
            train_nn(
                output_folder=os.path.join(output_folder, 'nn'),
                output_name=args.output,
                dataset_size=args.dataset,
                epochs=args.epochs,
                lr=args.l_rate
            )

        if args.train_mf:
            train_mf(
                output_folder=os.path.join(output_folder, 'mf'),
                output_name=args.output,
                dataset_size=args.dataset,
            )


if __name__ == '__main__':
    main()
