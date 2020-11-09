import os
import pickle

from server.utilities import db_connection, is_admin, is_user
import numpy as np

model_name = '100k'


def get_recommendations(user_id: int):
    # TODO: Check auth for this endpoint
    connection, cursor = db_connection()

    def magnitude(a: np.ndarray):
        return np.sqrt(np.dot(a, a))

    def similarity(a: np.ndarray, b: np.ndarray):
        return np.dot(a, b)/(magnitude(a)*magnitude(b))

    with open(f"model/mf/{model_name}_d.mat.pickle", 'rb') as file:
        users = pickle.loads(file.read())

    matrix = np.load(f"model/mf/{model_name}_r.npy")

    n_movies = cursor.execute("SELECT COUNT(*) FROM movies;")
    print(f"n_movies: {n_movies}")
    raw_ratings = cursor.execute(f"SELECT * FROM movie_feedback WHERE user_id={user_id};")
    print("raw_ratings")
    print(raw_ratings)
    # ratings = np.zeros(n_movies)


