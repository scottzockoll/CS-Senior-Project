import os.path
import random
import math
import numpy as np
from typing import Dict, List

import pandas as pd
import torch.utils.data


def load_dataframe(path: str):
    """
    Load the dataframe into memory
    :param path:
    :return:
    """
    frame = pd.read_csv(path)
    frame.columns = ['user_id', 'movie_id', 'rating', 'timestamp']
    frame = frame.drop(columns=['timestamp'])
    return frame


class IdxReducer:
    """
    Maps a set of indexes to a contiguous set of indexes.
    """

    def __init__(self, items: List[int] = None):
        self._map: Dict[int, int] = dict()

        if items is None:
            return

        for item in items:
            self.reduce(item)

    def __contains__(self, idx: int) -> bool:
        return idx in self._map

    def reduce(self, idx: int) -> int:
        """
        Return the mapped index.
        :param idx:
        :return:
        """
        if idx in self._map:
            return self._map.get(idx)

        self._map[idx] = len(self._map) + 1
        return self._map[idx]


# TODO: CITE THIS AND ADD KNOWN NEGATIVES
# a few papers also describe known-negatives improving performance; so we'll
# generate a few random negatives for each positive entry as described
class MovieLens(torch.utils.data.Dataset):
    """
    A generator for reading movie ratings from the disk.
    """

    def __init__(self, path: str, size: str, test: float = 0.05):
        """
        Create a new MovieLens model.
        :param path: The folder where datasets is stored.
        :param size: The dataset size. Must be one of ['100k']
        :param test: Percent of each user's record set to leave out for testing.
        """
        super(MovieLens, self).__init__()

        if size not in ['100k']:
            raise ValueError('Must be one of "100k"')

        self._user_map = IdxReducer()
        self._item_map = IdxReducer()

        path = os.path.abspath(path)
        path = os.path.join(path, 'movie_lens', size, 'ratings.csv')
        self.frame: pd.DataFrame = load_dataframe(path)

        num_users = len(self.frame['user_id'].unique())
        num_items = len(self.frame['movie_id'].unique())
        self.shape = (num_users, num_items)

        self.user_train: [int] = []
        self.item_train: [int] = []
        self.rate_train: [float] = []

        self.user_test: [int] = []
        self.item_test: [int] = []
        self.rate_test: [float] = []

        loaded_ratings: Dict[int, Dict[str, List[str]]] = dict()
        for idx, row in self.frame.iterrows():
            user_id = self.map_user(row['user_id'])
            item_id = self.map_item(row['movie_id'])
            rating = self.map_rating(row['rating'])

            if user_id not in loaded_ratings:
                loaded_ratings[user_id] = {
                    "item_ids": [],
                    "ratings": []
                }

            loaded_ratings[user_id]['item_ids'].append(item_id)
            loaded_ratings[user_id]['ratings'].append(rating)

        for user_id in loaded_ratings.keys():
            items: [int] = loaded_ratings[user_id]['item_ids']
            ratings: [int] = loaded_ratings[user_id]['ratings']

            items: [int] = list(items)
            ratings: [int] = list(ratings)

            # sanity check
            assert len(items) == len(ratings)

            for _ in range(math.floor(len(items)*test)):
                item = items.pop()
                rating = ratings.pop()

                self.user_test.append(user_id)
                self.item_test.append(item)
                self.rate_test.append(rating)

            self.user_train.extend([user_id]*len(items))
            self.item_train.extend(items)
            self.rate_train.extend(ratings)

    def map_user(self, user_id: int) -> int:
        """
        Map a user_id to a contiguous equivalent.
        :param user_id:
        :return:
        """
        return self._user_map.reduce(user_id)

    def map_item(self, movie_id: int) -> int:
        """
        Map a movie_id to a contiguous equivalent.
        :param movie_id:
        :return:
        """
        return self._item_map.reduce(movie_id)

    def map_rating(self, rating: float) -> float:
        """
        Map a rating to a binary yes/no rating.
        :param rating:
        :return:
        """
        if rating > 0:
            return 1
        else:
            return 0

    def __getitem__(self, idx: int):
        return {
            'user_id': self.user_train[idx],
            'item_id': self.item_train[idx],
            'rating': self.rate_train[idx]
        }

    def __len__(self):
        return self.shape[1]

    # def make_matrix(self, frame: pd.DataFrame):
    #     num_users = len(frame['user_id'].unique())
    #     num_items = len(frame['movie_id'].unique())
    #
    #     matrix = sparse.dok_matrix((num_users + 1, num_items + 1), dtype=np.float32)
    #
    #     # map existing known-good ratings; we use ones are positive here to reduce
    #     # the number of classes which a number of papers say can improve performance
    #     # for idx, row in frame.iterrows():
    #     #     user_id = self.map_user(row['user_id'])
    #     #     item_id = self.map_item(row['movie_id'])
    #     #     rating = self.map_rating(row['rating'])
    #     #
    #     #     matrix[user_id, item_id] = rating
    #
    #     # TODO: CITE THIS AND ENABLE
    #     # a few papers also describe known-negatives improving performance; so we'll
    #     # generate a few random negatives for each positive entry as described
    #     # def fill_negatives(user_id: int, n_negatives=100):
    #     #     while n_negatives > 0:
    #     #         r_idx = np.random.randint(0, num_users)
    #     #
    #     #         if (user_id, r_idx) in matrix:
    #     #             matrix[user_id, r_idx] = -1
    #     #             n_negatives -= 1
    #     #
    #     # counts = frame.groupby(['user_id']).count()['movie_id']
    #     # for idx in tqdm(range(1, num_users + 1), total=num_users):
    #     #     fill_negatives(idx, counts[idx]*100)
    #
    #
    #     return matrix




