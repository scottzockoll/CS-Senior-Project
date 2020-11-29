from server.utilities import db_connection
from typing import Union


# TODO: Handle comma separated lists of movies e.g. id="1,9,5,3"
def query_get_feedback(userId: int, movieId: int):
    """
    Return the user’s feedback of the specified movie id
    :param Union[int, str] userId: The user id to retrieve
    :param Union[int, str] movieId: The movie id to retrieve
    :return: JSON object of movie id and rating
    """
    
    con, cursor = db_connection()
    
    try:
        cursor.execute("SELECT rating FROM movie_feedback WHERE user_id={u} AND movie_id={m}".format(u = userId, m = movieId))
        result = cursor.fetchone()
        if cursor.rowcount == 1:
            data = {
                "id": movieId,
                "rating": result[0]
            }
            return data
        else:
            return None
    finally:
        cursor.close()
        con.close()
