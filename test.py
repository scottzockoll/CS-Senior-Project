import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pandas.api.types import CategoricalDtype
from scipy.sparse import csr_matrix


def convert_to_64bit_indices(A):
    A.indptr = np.array(A.indptr, copy=False, dtype=np.int64)
    A.indices = np.array(A.indices, copy=False, dtype=np.int64)
    return A


df: pd.DataFrame = pd.read_csv('dataset/processed/25m/ratings_train_pos.csv')
df.columns = ['user_id', 'movie_id', 'rating']
user_cat = CategoricalDtype(sorted(df.user_id.unique()), ordered=True)
movie_cat = CategoricalDtype(sorted(df.movie_id.unique()), ordered=True)
row = df.user_id.astype(user_cat).cat.codes
col = df.movie_id.astype(movie_cat).cat.codes
mat: csr_matrix = csr_matrix(
    (df.rating, (row, col)), shape=(user_cat.categories.size, movie_cat.categories.size),
    dtype='int64'
)
del df
mat = convert_to_64bit_indices(mat)
print(cosine_similarity(mat))
