from server.auth import is_user
from server.queries.create.query_create_feedback import query_create_feedback
from flask import Response
import json


def create_feedback(userId: int, movieId: int):
    """
    Create a new feedback row for a movie from a user
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedback id
    """
    
    # The line below is for the request body content, which is awaiting implementation on the frontend.
    # rating = request.form["rating"]
    
    # TODO: For now it is hardcoded for testing purposes
    rating = 1
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Create row in database
        result = query_create_feedback(userId, movieId, rating)
        if result is None:
            return Response({}, mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=201)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
