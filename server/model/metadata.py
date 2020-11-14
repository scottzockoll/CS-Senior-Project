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

        with open(self.metadata_path, 'rb') as file:
            metadata = pickle.load(file)
            self.n_users: int = metadata['n_users']
            self.n_movies: int = metadata['n_movies']
            self.n_items: int = metadata['n_items']
            self.train_size: int = metadata['train_size']
            self.test_size: int = metadata['test_size']
            self.movie_map: Dict[int, int] = metadata['movie_ids']

    def map_movie_id(self, movie_id: int) -> int:
        return self.movie_map.get(movie_id)
