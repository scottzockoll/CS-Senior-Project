from server.utilities import db_connection
from typing import Union


def query_create_feedback(userId: Union[int, str], movieId: Union[int, str], rating: Union[int, str]):
    """
    Create a new feedback row for a movie from a user
    :param Union[int, str] userId: The user id to retrieve
    :param Union[int, str] movieId: The movie id to retrieve
    :param Union[int, str] rating: The rating to apply to the movie
    :return: JSON object of feedback id
    """
    
    con, cursor = db_connection()
    
    try:
        cursor.execute("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES ({r}, {m}, {u})".format(r = rating, m = movieId, u = userId))
        if cursor.rowcount == 1:
            con.commit()
            data = {
                "feedbackId": cursor.lastrowid
            }
            return data
        else:
            con.rollback()
            return None
    finally:
        cursor.close()
        con.close()
