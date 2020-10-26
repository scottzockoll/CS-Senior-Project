import os
import csv
import torch.utils.data


class MovieLens(torch.utils.data.IterableDataset):
    def __init__(self, folder_path: str, file_name: str):
        super(MovieLens, self).__init__()

        folder_path = os.path.abspath(folder_path)

        self.file_path = os.path.join(folder_path, file_name)

    def __iter__(self):
        with open(self.file_path, 'r') as file:
            reader = csv.reader(file)

            def read() -> (int, int, float):
                user_id, movie_id, rating = next(reader)
                return int(user_id), int(movie_id), float(rating)

            try:
                while True:
                    row = read()
                    yield {
                        'user_id': row[0],
                        'movie_id': row[1],
                        'rating': row[2]
                    }
            except StopIteration:
                return
