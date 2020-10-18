import os
import csv
import numpy as np
from typing import Dict
import torch.utils.data
from time import time
import random


class MovieLens(torch.utils.data.IterableDataset):

    @property
    def movies_path(self):
        return os.path.join(self.path, 'movies.csv')

    @property
    def ratings_path(self):
        return os.path.join(self.path, 'ratings.csv')

    @property
    def tags_path(self):
        return os.path.join(self.path, 'tags.csv')

    def __init__(self, path: str, dataset_size: str, n_train: int = 100):
        super(MovieLens, self).__init__()

        assert dataset_size in ['100k', '25m']

        self.path = os.path.abspath(path)
        self.path = os.path.join(path, 'movie_lens', dataset_size)

        self.n_users = 0
        self.n_movies = 0
        self.n_items = 0
        self.movie_id_map: Dict[int, int] = dict()

    def prepare(self):
        print('Preparing dataset meta-data...')

        t0 = time()

        users = set()
        movies = set()
        with open(self.ratings_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)

            for row in reader:
                self.n_items += 1
                users.add(int(row[0]))
                movies.add(int(row[1]))

        for movie_id in sorted(movies):
            self.movie_id_map[movie_id] = len(self.movie_id_map) + 1

        self.n_users = len(users)
        self.n_movies = len(movies)

        print(f'Preparation complete in {time()-t0:.3}s')
        print(f'> {self.n_users:,} users, {self.n_movies:,} movies, {self.n_items:,} items')

    def __iter__(self):
        with open(self.ratings_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)

            def read() -> (int, int, float):
                user_id, movie_id, rating, _ = next(reader)
                return int(user_id), self.movie_id_map[int(movie_id)], float(rating)

            def negative_sample(pos_idxs: np.ndarray, n_items: int, n_samples: int = 32):
                # https://tech.hbc.com/2018-03-23-negative-sampling-in-numpy.html
                raw_samp = np.random.randint(0, n_items - len(pos_idxs), size=n_samples)
                pos_idxs_adjacent = pos_idxs - np.arange(len(pos_idxs))
                neg_idxs = raw_samp + np.searchsorted(pos_idxs_adjacent, raw_samp, side='right')
                return neg_idxs

            prev: (int, int, float) = None
            queue: [(int, int, float)] = []
            while True:
                # on n>0 loops; use prev user
                if prev is None:
                    prev = read()
                queue.append(prev)
                try:
                    # read until user changes
                    while prev[0] == queue[0][0]:
                        prev = read()
                        queue.append(prev)
                except StopIteration:
                    prev = None
                    queue.append(prev)
                # always pop last user (not part of group) or None
                queue.pop()

                negatives = negative_sample(np.array(list(map(lambda row: row[1], queue))), self.n_movies, len(queue)*10)
                queue = [*queue, *map(lambda x: (queue[0][0], x, 0), negatives)]

                del negatives

                random.shuffle(queue)

                while not len(queue) == 0:
                    row = queue.pop(0)
                    yield {
                        'user_id': row[0],
                        'movie_id': row[1],
                        'rating': row[2]
                    }

                if prev is None:
                    return


# def load_dataframe(path: str):
#     """
#     Load the dataframe into memory
#     :param path:
#     :return:
#     """
#     frame = pd.read_csv(path)
#     frame.columns = ['user_id', 'movie_id', 'rating', 'timestamp']
#     frame = frame.drop(columns=['timestamp'])
#     return frame
#
#
# class IdxReducer:
#     """
#     Maps a set of indexes to a contiguous set of indexes.
#     """
#
#     def __init__(self, items: List[int] = None):
#         self._map: Dict[int, int] = dict()
#
#         if items is None:
#             return
#
#         for item in items:
#             self.reduce(item)
#
#     def __contains__(self, idx: int) -> bool:
#         return idx in self._map
#
#     def reduce(self, idx: int) -> int:
#         """
#         Return the mapped index.
#         :param idx:
#         :return:
#         """
#         if idx in self._map:
#             return self._map.get(idx)
#
#         self._map[idx] = len(self._map) + 1
#         return self._map[idx]
#
#
# class MovieLens(torch.utils.data.Dataset):
#     """
#     A generator for reading movie ratings from the disk.
#     """
#
#     def __init__(self, path: str, size: str, test: float = 0.05):
#         """
#         Create a new MovieLens model.
#         :param path: The folder where datasets is stored.
#         :param size: The dataset size. Must be one of ['100k']
#         :param test: Percent of each user's record set to leave out for testing.
#         """
#         super(MovieLens, self).__init__()
#
#         if size not in ['100k']:
#             raise ValueError('Must be one of "100k"')
#
#         self._user_map = IdxReducer()
#         self._item_map = IdxReducer()
#
#         path = os.path.abspath(path)
#         path = os.path.join(path, 'movie_lens', size, 'ratings.csv')
#         self.frame: pd.DataFrame = load_dataframe(path)
#
#         num_users = len(self.frame['user_id'].unique())
#         num_items = len(self.frame['movie_id'].unique())
#         self.shape = (num_users, num_items)
#
#         self.user_train: [int] = []
#         self.item_train: [int] = []
#         self.rate_train: [float] = []
#
#         self.user_test: [int] = []
#         self.item_test: [int] = []
#         self.rate_test: [float] = []
#
#         loaded_ratings: Dict[int, Dict[str, List[str]]] = dict()
#         for idx, row in self.frame.iterrows():
#             user_id = self.map_user(row['user_id'])
#             item_id = self.map_item(row['movie_id'])
#             rating = self.map_rating(row['rating'])
#
#             if user_id not in loaded_ratings:
#                 loaded_ratings[user_id] = {
#                     "item_ids": [],
#                     "ratings": []
#                 }
#
#             loaded_ratings[user_id]['item_ids'].append(item_id)
#             loaded_ratings[user_id]['ratings'].append(rating)
#
#         for user_id in loaded_ratings.keys():
#             items: [int] = loaded_ratings[user_id]['item_ids']
#             ratings: [int] = loaded_ratings[user_id]['ratings']
#
#             items: [int] = list(items)
#             ratings: [int] = list(ratings)
#
#             # sanity check
#             assert len(items) == len(ratings)
#
#             for _ in range(math.floor(len(items)*test)):
#                 item = items.pop()
#                 rating = ratings.pop()
#
#                 self.user_test.append(user_id)
#                 self.item_test.append(item)
#                 self.rate_test.append(rating)
#
#             self.user_train.extend([user_id]*len(items))
#             self.item_train.extend(items)
#             self.rate_train.extend(ratings)
#
#     def map_user(self, user_id: int) -> int:
#         """
#         Map a user_id to a contiguous equivalent.
#         :param user_id:
#         :return:
#         """
#         return self._user_map.reduce(user_id)
#
#     def map_item(self, movie_id: int) -> int:
#         """
#         Map a movie_id to a contiguous equivalent.
#         :param movie_id:
#         :return:
#         """
#         return self._item_map.reduce(movie_id)
#
#     def map_rating(self, rating: float) -> float:
#         """
#         Map a rating to a binary yes/no rating.
#         :param rating:
#         :return:
#         """
#         if rating > 0:
#             return 1
#         else:
#             return 0
#
#     def __getitem__(self, idx: int):
#         return {
#             'user_id': self.user_train[idx],
#             'item_id': self.item_train[idx],
#             'rating': self.rate_train[idx]
#         }
#
#     def __len__(self):
#         return self.shape[1]
#