from server.queries.get.query_get_user import query_get_user
import server.auth
import server.utilities
from flask import Response
import json


def get_user(id: int):
    """
    Returns a single user by user id
    :param int id: The user id to retrieve
    :return: JSON object with all user information
    """

    try:
        # Validates user permission
        if not server.auth.is_user():
            return Response(json.dumps({}), mimetype='application/json', status=403)

        # Validate input parameters
        if not isinstance(id, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)

        # Retrieve a user
        result = query_get_user(id)
        if not result:
            return Response(json.dumps({}), mimetype='application/json', status=404)
        else:
            return Response(json.dumps(result), mimetype='application/json', status=200)

    except Exception as e:
        print(f'Error in get_user')
        print(e)
        return Response(json.dumps({}), mimetype='application/json', status=500)
