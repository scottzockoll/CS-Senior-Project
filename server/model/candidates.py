import csv
import os
import pickle
from typing import Set, Dict

import numpy as np
import scipy
from scipy.sparse import lil_matrix, csr_matrix
from sklearn.decomposition import NMF
from tqdm import tqdm


def collect_metadata(file_path: str) -> (int, Set[int], Set[int]):
    items = 0
    users = set()
    movies = set()
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)

        try:
            while True:
                user_id, movie_id, rating, timestamp = next(reader)
                users.add(int(user_id))
                movies.add(int(movie_id))
                items += 1
        except StopIteration:
            return items, users, movies


def construct_matrix(
        file_path: str,
        n_users: int,
        n_movies: int,
        n_items: int,
        movie_map: Dict[int, int]) -> scipy.sparse.csr_matrix:

    # lil is optimized for incremental assignments
    matrix = lil_matrix((n_users, n_movies), dtype='int8')
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)
        for user_id, movie_id, rating, timestamp in tqdm(reader, total=n_items, desc='Loading data...', unit='sample'):
            matrix[int(user_id)-1, movie_map.get(int(movie_id))] = 1

    # csr is more efficient once constructed
    return csr_matrix(matrix)


def train_mf(output_folder: str, output_name: str, dataset_size: str):

    print(f'Generating FlickPick candidate selection model.')
    path = os.path.join('dataset', 'movie_lens', dataset_size, 'ratings.csv')

    print(f'Collecting dataset metadata...')
    n_items, users, movies = collect_metadata(path)
    # n_users = len(users)
    # n_movies = len(movies)

    mapped_ids = dict()
    for entry in movies:
        mapped_ids[entry] = len(mapped_ids)-1

    print(f"{n_items} items, {len(users)} users, {len(movies)} movies")

    # construct the matrix incrementally, using an lil matrix which is designed for incremental construction
    matrix = construct_matrix(path, len(users), len(movies), n_items, mapped_ids)

    print(f"Matrix is {(1-(matrix.nnz / (matrix.shape[0] * matrix.shape[1])))*100:0.3f}% empty.")

    # mem_path = os.path.join('temp', 'memmap')
    # os.makedirs(mem_path, exist_ok=True)

    n_components = 20
    # w_shape = (n_users, n_components)
    # r_shape = (n_users, n_movies)

    print('Training model, this may take awhile...')
    model = NMF(n_components=n_components, init='random', random_state=0, max_iter=5000, verbose=True)

    w = model.fit_transform(matrix)
    h = model.components_

    r = np.dot(w, h)
    print('Saving factored matrix...')
    np.save(os.path.join(output_folder, f"{output_name}_r.npy"), r)
    print('Saving sparse user data...')
    with open(os.path.join(output_folder, f"{output_name}_d.mat.pickle"), 'wb') as file:
        file.write(pickle.dumps(matrix))

    print('Done!')

    # clear old map/create empty file
    # r: np.memmap = np.memmap(output_path, shape=r_shape, dtype=np.float32, mode='w+')
    # for w_i in tqdm(range(w_shape[0]), total=w_shape[0], desc='Computing and saving matrix...', unit='user'):
    #     r[w_i] = np.inner(w[w_i], h_t)
    #     r.flush()


