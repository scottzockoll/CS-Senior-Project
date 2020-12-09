from server.utilities import db_connection, process_movie_tags
from server.auth import is_admin
from flask import Response
import server
import json
from server.queries.get.query_get_users_fname_autocomplete import query_get_users_fname_autocomplete


def get_users_fname_autocomplete(firstName: str, offset: int, limit: int = 500):
    """
    Get a list of auto-complete suggestions for a partial user's first name.
    :param str firstName: The first name to find suggestions for.
    :param int offset: The specified offset for data returned.
    :param int limit: The specified limit for data returned. If not included, default is 500.
    :return: A JSON object containing a list of dictionaries containing
    user information and the movies and tags they have rated.
    """

    try:
        if not is_admin():
            return Response(json.dumps({}), mimetype='application/json', status=401)
        elif not isinstance(firstName, str) or not isinstance(offset, int) or not isinstance(limit, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        else:
            result = query_get_users_fname_autocomplete(firstName, offset, limit)

            if not result:
                return Response({}, mimetype='application/json', status=404)
            else:
                return Response(json.dumps(result), mimetype='application/json', status=200)
    except Exception as e:
        print(f'Error in get_users')
        print(e)
        return Response({}, mimetype='application/json', status=500)
