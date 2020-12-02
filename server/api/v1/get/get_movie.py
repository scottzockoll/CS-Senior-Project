
from server.auth import is_user
from flask import Response
import json

from server.queries.get.get_movie import query_get_movie


def get_movie(id: int):
    """
    Return a movie, its genres, and its tags
    :param int id: The movie id to retrieve
    :return: JSON object of movie id, name, and genre tags
    """
    try:
        if not is_user():  # checks user
            return Response({}, mimetype='application/json', status=403)
        if not isinstance(id, int):  # checks if id is an integer
            return Response({}, mimetype='application/json', status=400)
        else:  # executes query
            result = query_get_movie(id)

            if result is None:  # make sure there is at least one result returned
                return Response({}, mimetype='application/json', status=404)
            else:
                return Response(json.dumps(result), mimetype='application/json', status=200)

    except Exception:
        return Response({}, mimetype='application/json', status=500)
