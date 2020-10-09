import argparse
import tensorflow_datasets as tfds

def main():
    # parser = argparse.ArgumentParser(description='Utility module for working with FlickPick model')
    # parser.add_argument('-t', '--train', help='Train the model', action='store_true')
    # parser.add_argument('-e', '--epochs', type=int, default=5, help='Number of epochs to train the model for')
    # parser.add_argument('-s', '--seed', type=int, help='Seed to use for shuffling test/train data')
    # parser.add_argument('-o', '--output', type=str, help='Output folder path', default='./model/output')
    # parser.add_argument('-d', '--data_dir', type=str, help='Input data directory', default='./dataset')
    #
    # args = parser.parse_args()
    #
    # if args.train:
    #     from model.recommender import run
    #
    #     run(**vars(args))

    datasets = ['100k', '1m', '20m']
    movies = ['movie_lens/%s-movies' % ds for ds in datasets]
    ratings = ['movie_lens/%s-ratings' % ds for ds in datasets]
    datasets = [*movies, *ratings]

    for ds in datasets:
        f = tfds.load(ds)


if __name__ == '__main__':
    main()
