import json

from flask import Response

from server.auth import is_user
from server.queries.get.query_get_feedback_tags import query_get_feedback_tags


def get_feedback_tags(userId: int, movieId: int):
    """
    Return the user’s feedback on tags of a specific movie
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedbacks array containing movie id, tag id, and rating
    """
    
    try:
        # Validate user permission level
        if not is_user():
            return Response(json.dumps({}), mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        
        # Retrieve feedback tags
        result = query_get_feedback_tags(userId, movieId)
        if result is None:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=200)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
