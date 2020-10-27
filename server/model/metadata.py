import os, pickle
from typing import Dict


class Metadata:
    """
    Loads pre-parsed meta-data from file and exposes it as a typed object.
    """

    @property
    def metadata_path(self):
        return os.path.join(self.path, 'dataset.pickle')

    def __init__(self, path: str):
        self.path = path

        self.n_users: int = 0
        self.n_movies: int = 0
        self.n_items: int = 0
        self.train_size: int = 0
        self.test_size: int = 0

        with open(self.metadata_path, 'rb') as file:
            metadata = pickle.load(file)
            self.n_users = metadata['n_users']
            self.n_movies = metadata['n_movies']
            self.n_items = metadata['n_items']
            self.train_size = metadata['train_size']
            self.test_size = metadata['test_size']
