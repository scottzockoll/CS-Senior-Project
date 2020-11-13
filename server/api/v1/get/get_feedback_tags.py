from server.utilities import db_connection, is_user
from flask import Response
import json


def get_feedback_tags(userId: int, movieId: int):
    """
    Return the user’s feedback on tags of a specific movie
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedbacks array containing movie id, tag id, and rating
    """
    con, cursor = db_connection()
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Create row in database
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
            return Response(json.dumps(data), mimetype='application/json', status=200)
        else:
            return Response({}, mimetype='application/json', status=404)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
