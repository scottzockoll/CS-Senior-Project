import argparse


def main():
    parser = argparse.ArgumentParser(description='Utility module for working with FlickPick model')
    parser.add_argument('-t', '--train', help='Train the model', action='store_true')
    parser.add_argument('-e', '--epochs', type=int, default=5, help='Number of epochs to train the model for')
    parser.add_argument('-s', '--seed', type=int, help='Seed to use for shuffling test/train data')
    parser.add_argument('-o', '--output', type=str, help='Output folder path', default='./model/output')
    parser.add_argument('-d', '--data_dir', type=str, help='Input data directory', default='./dataset')

    args = parser.parse_args()

    if args.train:
        from model.recommender import run

        run(**vars(args))


if __name__ == '__main__':
    main()
