from server.utilities import db_connection
from flask import Response
import json


def create_feedback(userId: int, movieId: int):
    """
    Create a new feedback row for a movie from a user
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedback id
    """
    con, cursor = db_connection()
    
    # The line below is for the request body content, which is awaiting implementation on the frontend.
    # rating = request.form["rating"]
    
    # For now it is hardcoded for testing purposes
    rating = 1
    
    try:
        # Validate user permission level (eventually will come from OAuth)
        if not True:
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Create row in database
        cursor.execute("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES ({r}, {m}, {u})".format(r = rating, m = movieId, u = userId))
        if cursor.rowcount == 1:
            con.commit()
            data = {
                "id": cursor.lastrowid
            }
            return Response(json.dumps(data), mimetype='application/json', status=201)
        else:
            con.rollback()
            return Response({}, mimetype='application/json', status=404)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
