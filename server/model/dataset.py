import os
import csv
import torch.utils.data
import random

from server.model.metadata import Metadata


class MovieLens(torch.utils.data.IterableDataset):
    def __init__(self, folder_path: str, file_name: str, buffer_size: int = 4096):
        super(MovieLens, self).__init__()

        folder_path = os.path.abspath(folder_path)

        self.meta_data = Metadata(folder_path)
        self.file_path = os.path.join(folder_path, file_name)

        self.buffer_size = buffer_size

    def __iter__(self):
        with open(self.file_path, 'r') as file:
            reader = csv.reader(file)

            def read() -> (int, int, float):
                user_id, movie_id, rating = next(reader)
                return int(user_id), int(movie_id), float(rating)

            done = False
            buffer: [(int, int, float)] = []
            while not done:
                try:
                    for idx in range(self.buffer_size):
                        buffer.append((read()))
                except StopIteration:
                    done = True

                random.shuffle(buffer)

                while not len(buffer) == 0:
                    row = buffer.pop(0)

                    print(row)

                    yield {
                        'user_id': row[0],
                        'movie_id': self.meta_data.map_movie_id(row[1]),
                        'rating': row[2]
                    }
