from server import app
import os
from server.model.train import train_model
import argparse


def main():
    parser = argparse.ArgumentParser(description='FlickPick server.')
    parser.add_argument('--train', action='store_true', help="Start the server in model training mode.")
    parser.add_argument('-d', '--dataset', type=str, help="Size of dataset.")
    parser.add_argument('-o', '--output', type=str, help='Name of output model to be saved.')
    parser.add_argument('--epochs', type=int, default=5, help='Number of passes through the data.')
    parser.add_argument('--l_rate', type=float, default=1e-5, help='Learning rate to use.')

    args = parser.parse_args()

    if args.train:
        if not args.output:
            raise ValueError('An output file must be specified in training mode.')
        if not args.dataset:
            raise ValueError('A dataset size must be specified in training mode.')

        train_model(
            output_folder=os.path.abspath('model'),
            output_name=args.output,
            dataset_size=args.dataset,
            epochs=args.epochs,
            lr=args.l_rate
        )


if __name__ == '__main__':
    main()
