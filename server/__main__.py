from server import app
import os
from server.model.train import train_model
import argparse


def main():
    parser = argparse.ArgumentParser(description='FlickPick server.')
    parser.add_argument('--train', action='store_true', help="Start the server in model training mode.")
    parser.add_argument('-o', '--output', type=str, help='Name of output model to be saved.')

    args = parser.parse_args()

    if args.train:
        if not args.output:
            raise ValueError('An output file must be specified in training mode.')

        train_model(
            output_folder=os.path.abspath('model'),
            output_name=args.output
        )


if __name__ == '__main__':
    main()
