from server.utilities import db_connection
from typing import Union


# TODO: Handle comma separated lists of movies e.g. id="1,9,5,3"
def query_get_feedback_tags(userId: Union[int, str], movieId: Union[int, str]):
    """
    Return the user’s feedback on tags of a specific movie
    :param Union[int, str] userId: The user id to retrieve
    :param Union[int, str] movieId: The movie id to retrieve
    :return: JSON object of feedbacks array containing movie id, tag id, and rating
    """
    
    con, cursor = db_connection()
    
    try:
        cursor.execute("SELECT movie_feedback.movie_id, tag_feedback.tag_id, tag_feedback.rating FROM movie_feedback JOIN tag_feedback ON movie_feedback.movie_id = tag_feedback.movie_id WHERE movie_feedback.user_id={u} AND movie_feedback.movie_id={m}".format(u = userId, m = movieId))
        result = cursor.fetchall()
        if cursor.rowcount > 0:
            data = {}
            feedbacks = []
            for row in result:
                feedbacks.append({
                    "movie_id": row[0],
                    "tag_id": row[1],
                    "rating": row[2]
                })
            data.update({"feedbacks": feedbacks})
            return data
        else:
            return None
    finally:
        cursor.close()
        con.close()
