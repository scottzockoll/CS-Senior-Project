import json

from flask import Response

from server.auth import is_user
from server.queries.get.query_get_tag import query_get_tag


def get_tag(id: int):
    """
    Return a tag by id
    :param int id: The tag id to retrieve
    :return: JSON object of tag id, name and movie id
    """

    try:
        if not is_user():
            return Response(json.dumps({}), mimetype='application/json', status=403)
        if not isinstance(id, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        else:
            result = query_get_tag(id)

            if result is None:
                return Response(json.dumps({}), mimetype='application/json', status=404)
            else:
                return Response(json.dumps(result), mimetype='application/json', status=200)
    except Exception as e:
        print(e)
        return Response(json.dumps({}), mimetype='application/json', status=500)
