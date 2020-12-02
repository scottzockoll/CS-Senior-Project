import json

from server.utilities import db_connection
from server.auth import is_user
from Levenshtein import distance
from flask import Response


def get_movie_autocomplete(name: str):
    """
    Get a list of auto-complete suggestions for a partial movie title
    :param str name: The movie title to find suggestions for
    :return: JSON object of movies array containing movie id and title
    """
    con, cursor = db_connection()

    try:
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        else:
            cursor.execute(f"SELECT id, name FROM movies WHERE name LIKE '{name}__%'")

            result = cursor.fetchall()

            if len(result) == 0:
                return []
            else:
                distances = [(distance(a[1], name), a[0], a[1]) for a in result]
                titles = list(map(lambda movie: {'id': movie[1], 'title': movie[2]}, sorted(distances)))[:10]

                # TODO: Update to return complete object (similar to get_movie)
                return Response(json.dumps(titles), mimetype='application/json', status=200)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
