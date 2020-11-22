from server.utilities import db_connection
from server.auth import is_user
from flask import Response
import json


def get_feedback(userId: int, movieId: int):
    """
    Return the user’s feedback of the specified movie id
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of movie id and rating
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
        cursor.execute("SELECT rating FROM movie_feedback WHERE user_id={u} AND movie_id={m}".format(u = userId, m = movieId))
        result = cursor.fetchone()
        if cursor.rowcount == 1:
            data = {
                "id": movieId,
                "rating": result[0]
            }
            return Response(json.dumps(data), mimetype='application/json', status=200)
        else:
            return Response({}, mimetype='application/json', status=404)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
