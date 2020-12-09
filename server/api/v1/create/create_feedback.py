import json

from flask import Response, request

from server.auth import is_user
from server.queries.create.query_create_feedback import query_create_feedback


def create_feedback(userId: int, movieId: int):
    """
    Create a new feedback row for a movie from a user
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedback id
    """
    rating = request.form["rating"]
    
    try:
        # Validate user permission level
        if not is_user():
            return Response(json.dumps({}), mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        
        # Create row in database
        result = query_create_feedback(userId, movieId, rating)
        if result is None:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=201)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
