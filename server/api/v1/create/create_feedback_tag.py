from server.utilities import db_connection, is_user
from flask import Response
import json


def create_feedback_tag(userId: int, movieId: int, tagId: int):
    """
    Replace the feedback for a specific tag id
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :param int tagId: The tag id to retrieve
    :return: JSON object of feedback id
    """
    con, cursor = db_connection()
    
    # The line below is for the request body content, which is awaiting implementation on the frontend.
    # rating = request.form["rating"]
    
    # TODO: For now it is hardcoded for testing purposes
    rating = 1
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int) and not isinstance(tagId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Create row in database
        cursor.execute("INSERT INTO tag_feedback (rating, movie_id, user_id, tag_id) VALUES ({r}, {m}, {u}, {t})".format(r = rating, m = movieId, u = userId, t = tagId))
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
