import pickle
import json

from server.utilities import db_connection
from server.auth import is_admin, is_current_user
from server.queries.get.query_get_movie import query_get_movie
from flask import Response
import numpy as np

model_name = '100k'


def get_recommendations(user_id: int):
    """
    Retrieves the top 10 best movies to fit a user's current taste.
    :param int user_id: The user to make a recommendation for
    :return: A list of recommended movies and all of their data
    """
    if not (is_admin() or is_current_user(user_id)):
        return Response(json.dumps({}), mimetype='application/json', status=401)
    else:
        connection, cursor = db_connection()

        limit = 10

        def magnitude(a: np.ndarray):
            return np.linalg.norm(a)

        def similarity(a: np.ndarray, b: np.ndarray):
            return np.dot(a, b)/(magnitude(a)*magnitude(b))

        with open(f"model/mf/{model_name}_d.mat.pickle", 'rb') as file:
            ratings_mat = pickle.loads(file.read())

        predict_mat = np.load(f"model/mf/{model_name}_r.npy")

        # TODO: Slow. Should be loaded from disk.
        cursor.execute("SELECT MAX(movie_id) FROM movie_feedback;")
        model_size = cursor.fetchone()[0]

        cursor.execute(f"SELECT movie_id-1 FROM movie_feedback WHERE user_id={user_id};")
        user_ratings = cursor.fetchall()

        user_ratings = np.array(user_ratings).flat
        user_ratings_dense = np.zeros(model_size)
        np.put(user_ratings_dense, user_ratings, [1])
        user_ratings = set(user_ratings)

        # Calculate which users are the most similar to the requested user
        similarities = [(idx, similarity(user_ratings_dense, row.todense().flat)) for idx, row in enumerate(ratings_mat)]
        similarities = sorted(similarities, key=lambda x: x[1], reverse=True)

        # Calculate the candidates based on the top 5 most similar users
        # Some movies will overlap, we'll weight those stronger
        candidates = np.zeros_like(user_ratings_dense)
        for sim_id, sim_val in similarities[:5]:
            candidates += ratings_mat[sim_id - 1].todense().flat * predict_mat[sim_id - 1]

        candidates = list(
            map(
                lambda x: x[0],
                sorted(
                    filter(
                        lambda x: x[0] not in user_ratings,
                        enumerate(candidates)
                    ),
                    key=lambda x: x[1],
                    reverse=True
                )
            )
        )
        candidates = list(map(query_get_movie, candidates[:limit]))
        return json.dumps(candidates)
