from server.utilities import db_connection
from flask import Response


def update_feedback(feedbackId: int):
    """
    Replace a user's feedback of a specific movie
    :param int feedbackId: The feedback id to retrieve
    :return: Nothing
    """
    con, cursor = db_connection()
    
    # The line below is for the request body content, which is awaiting implementation on the frontend.
    # rating = request.form["rating"]
    
    # TODO: For now it is hardcoded for testing purposes
    rating = 1
    
    try:
        # TODO: Validate user permission level (eventually will come from OAuth)
        if not True:
            return Response({}, mimetype='application/json', status=403)
        
        # Validate input parameters
        if not isinstance(feedbackId, int):
            return Response({}, mimetype='application/json', status=400)
        
        # Update row in database
        cursor.execute("UPDATE movie_feedback SET rating={r} WHERE id={f}".format(r = rating, f = feedbackId))
        if cursor.rowcount == 1:
            con.commit()
            return Response({}, mimetype='application/json', status=200)
        else:
            con.rollback() # necessary? update affects no row...
            return Response({}, mimetype='application/json', status=404)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
