from server.auth import is_user
from server.queries.update.query_update_feedback_tag import query_update_feedback_tag
from flask import Response, request
import json


def update_feedback_tag(feedbackId: int):
    """
    Replace the feedback for a specific tag id
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
        result = query_update_feedback_tag(feedbackId, rating)
        if not result:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps({}), mimetype='application/json', status=200)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
