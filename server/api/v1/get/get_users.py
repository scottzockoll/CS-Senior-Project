import server.auth
from server.queries.get.query_get_users import query_get_users
import server.utilities
from flask import Response
import json


def get_users(limit: int, offset: int):
    """
    Retrieves multiple rows from the master_user_feedback_view in the database
    given an int for row limit, and an int for the offset of where the SELECT
    statement starts.
    :param int limit: The limit which restricts how many rows are returned
    :param int offset: This specifies the offset of the first row to return.
    :return: A JSON object containing a list of dictionaries containing
    user information. The 'movie' key in each dictionary is also a list
    of dictionaries, with the 'tag' key for those also being a list of
    dictionaries.
    """

    try:

        if not server.auth.is_user():
            return Response({}, mimetype='application/json', status=403)

        if not isinstance(limit, int) or not isinstance(offset, int):  # checks if id is an integer
            return Response({}, mimetype='application/json', status=400)

        result = query_get_users(limit, offset)
        if not result:
            return Response({}, mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=200)

    except Exception as e:
        print(f'Error in get_users')
        print(e)
        return Response({}, mimetype='application/json', status=500)
