import json

from flask import Response, request

from server.auth import is_user
from server.queries.create.query_create_feedback_tag import query_create_feedback_tag


def create_feedback_tag(userId: int, movieId: int, tagId: int):
    """
    Replace the feedback for a specific tag id
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :param int tagId: The tag id to retrieve
    :return: JSON object of feedback id
    """

    rating = request.form["rating"]
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)

        # Validate input parameters
        if not isinstance(userId, int) and not isinstance(movieId, int) and not isinstance(tagId, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        
        # Create row in database
        result = query_create_feedback_tag(userId, movieId, tagId, rating)
        if result is None:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=201)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
