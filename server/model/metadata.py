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
        self.movie_id_map: Dict[int, int] = dict()

        with open(self.metadata_path, 'rb') as file:
            metadata = pickle.load(file)
            self.n_users = metadata['n_users']
            self.n_movies = metadata['n_movies']
            self.n_items = metadata['n_items']

            self.movie_id_map = metadata['movie_ids']

    def map_movie_id(self, movie_id: int) -> int:
        return self.movie_id_map.get(movie_id)
