from server.auth import is_user
from server.queries.update.query_update_feedback_tag import query_update_feedback_tag
from flask import Response

from server.utilities import log_exception_and_return_500


def update_feedback_tag(feedbackId: int):
    """
    Replace the feedback for a specific tag id
    :param int feedbackId: The feedback id to retrieve
    :return: Nothing
    """
    
    # The line below is for the request body content, which is awaiting implementation on the frontend.
    # rating = request.form["rating"]
    
    # TODO: For now it is hardcoded for testing purposes
    rating = 3
    
    try:
        # Validate user permission level
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(feedbackId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Update row in database
        result = query_update_feedback_tag(feedbackId, rating)

        if not result:
            return Response({}, mimetype='application/json', status=404)
        else:
            return Response({}, mimetype='application/json', status=200)
    except Exception as e:
        log_exception_and_return_500(e)
