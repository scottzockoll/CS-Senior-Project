from server.queries.get.query_get_feedback import query_get_feedback
from server.utilities import is_user
from flask import Response
import json


def get_feedback(userId: int, movieId: int):
    """
    Return the user’s feedback of the specified movie id
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of movie id and rating
    """    
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Retrieve feedback
        result = query_get_feedback(userId, movieId)
        
        if result is None:
            return Response({}, mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=200)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
