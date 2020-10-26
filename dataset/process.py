import os, argparse, pickle

import numpy as np
import pandas as pd
from tqdm import tqdm


def negative_sample(pos_idxs: np.ndarray, n_items: int, n_samples: int) -> np.ndarray:
    """
    Generate a set of UNIQUE negative samples, which exclude the positive samples in pos_idxs.
    pos_idxs must be sorted.
    :param pos_idxs: The positive samples to be included.
    :param n_items: The total number of possible values (1-?)
    :param n_samples: The number of samples to generate.
    :return: A ndarray of negative indexes.
    """
    # https://tech.hbc.com/2018-03-23-negative-sampling-in-numpy.html
    raw_samp = np.random.randint(0, n_items - len(pos_idxs), size=n_samples)
    pos_idxs_adjacent = pos_idxs - np.arange(len(pos_idxs))
    neg_idxs = raw_samp + np.searchsorted(pos_idxs_adjacent, raw_samp, side='right')
    return neg_idxs


def train_test_split(positives: np.ndarray, user_id: int, n_rows: int, n_train: float = 0.95):
    """
    Split test and train data, generate negative samples for each subset.
    """
    positives = np.sort(positives)
    negatives = negative_sample(positives, n_rows, len(positives)*10)

    # assert we have no overlap in our sets
    assert len(set(negatives).intersection(set(positives))) == 0

    train_pos, test_pos = np.split(positives, [int(n_train * len(positives))])
    train_neg, test_neg = np.split(negatives, [int(n_train * len(negatives))])

    train_pos = [(user_id, movie_id, 1) for movie_id in train_pos]
    test_pos = [(user_id, movie_id, 1) for movie_id in test_pos]
    train_neg = [(user_id, movie_id, 0) for movie_id in train_neg]
    test_neg = [(user_id, movie_id, 0) for movie_id in test_neg]

    return train_pos, test_pos, train_neg, test_neg


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dataset', type=str, help='Dataset size as per folder name in movie_lens.')

    args = parser.parse_args()

    i_path = os.path.join('movie_lens', args.dataset)
    i_path = os.path.abspath(i_path)
    o_path = os.path.join('processed', args.dataset)
    o_path = os.path.abspath(o_path)

    os.makedirs(o_path, exist_ok=True)

    df: pd.DataFrame = pd.read_csv(os.path.join(i_path, 'ratings.csv'))

    movies = df['movieId'].unique()
    movie_map = dict()
    metadata = {
        'n_users': len(df['userId'].unique()),
        'n_movies': len(movies),
        'n_items': len(df),
        'movie_ids': movie_map
    }

    print(f'Number of unique movies: {len(movies)}')

    for movie_id in movies:
        metadata['movie_ids'][int(movie_id)] = len(metadata['movie_ids']) + 1

    df['movieId'] = df['movieId'].map(lambda idx: movie_map.get(idx))

    with open(os.path.join(o_path, 'dataset.pickle'), 'wb') as file:
        file.write(pickle.dumps(metadata))

    train_pos_file = open(os.path.join('processed', args.dataset, 'ratings_train_pos.csv'), 'w')
    test_pos_file = open(os.path.join('processed', args.dataset, 'ratings_test_pos.csv'), 'w')
    train_neg_file = open(os.path.join('processed', args.dataset, 'ratings_train_neg.csv'), 'w')
    test_neg_file = open(os.path.join('processed', args.dataset, 'ratings_test_neg.csv'), 'w')

    grouped = df.groupby(['userId'])
    for group in tqdm(grouped[['userId']]):
        user_id = group[1]['userId'].iloc[0]
        movie_ids = group[1]['movieId'].to_numpy()
        train_pos, test_pos, train_neg, test_neg = train_test_split(movie_ids, user_id, metadata['n_movies'])

        for value in train_pos:
            train_pos_file.write(f'{value[0]},{value[1]},{value[2]}\n')
        for value in test_pos:
            test_pos_file.write(f'{value[0]},{value[1]},{value[2]}\n')
        for value in train_neg:
            train_neg_file.write(f'{value[0]},{value[1]},{value[2]}\n')
        for value in test_neg:
            test_neg_file.write(f'{value[0]},{value[1]},{value[2]}\n')

    train_pos_file.close()
    test_pos_file.close()
    train_neg_file.close()
    test_neg_file.close()


if __name__ == '__main__':
    main()