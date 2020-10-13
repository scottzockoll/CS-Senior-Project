from server import app
from server.model.train import train_model
import argparse


def main():
    parser = argparse.ArgumentParser(description='FlickPick server.')
    parser.add_argument('--train', action='store_true', help="Start the server in model training mode.")



    args = parser.parse_args()

    if args.train:
        train_model()


if __name__ == '__main__':
    main()
