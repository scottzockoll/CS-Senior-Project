import json

from flask import Response, request

from server.auth import is_user
from server.queries.update.query_update_feedback import query_update_feedback


def update_feedback(feedbackId: int):
    """
    Replace a user's feedback of a specific movie
    :param int feedbackId: The feedback id to retrieve
    :return: Nothing
    """

    rating = request.form["rating"]
    
    try:
        # Validate user permission level
        if not is_user():
            return Response(json.dumps({}), mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(feedbackId, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        
        # Update row in database
        result = query_update_feedback(feedbackId, rating)
        if not result:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps({}), mimetype='application/json', status=200)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
