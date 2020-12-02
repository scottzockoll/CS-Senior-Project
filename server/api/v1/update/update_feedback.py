from server.auth import is_user
from server.queries.update.query_update_feedback import query_update_feedback
from flask import Response, request


def update_feedback(feedbackId: int, rating: float):
    """
    Replace a user's feedback of a specific movie
    :param int feedbackId: The feedback id to retrieve
    :param float rating: Rating to set to
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
        result = query_update_feedback(feedbackId, rating)
        if not result:
            return Response({}, mimetype='application/json', status=404)
        else:
            return Response({}, mimetype='application/json', status=200)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
