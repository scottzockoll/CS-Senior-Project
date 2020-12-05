import json
from urllib.parse import unquote

from server.utilities import db_connection
from server.auth import is_user
from Levenshtein import distance
from flask import Response


def get_movie_autocomplete(name: str):
    """
    Get a list of auto-complete suggestions for a partial movie title
    :param str name: The movie title to find suggestions for
    :return: JSON object of movies array containing movie id, title, tags and genres
    """
    con, cursor = db_connection()

    name = unquote(name)

    try:
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        else:
            cursor.execute(
                f"SELECT movies.id, movies.name, group_concat(DISTINCT tags.name ORDER BY tags.name ASC SEPARATOR ',') as 'Tags',"
                f"group_concat(DISTINCT genre.genre ORDER BY genre.genre ASC SEPARATOR ',') as 'Genres' FROM FlickPick.movies "
                f"LEFT JOIN tags ON tags.movie_id = movies.id "
                f"LEFT JOIN genre ON genre.movie_id = movies.id "
                f"WHERE movies.name LIKE '{name}__%'"
                f"GROUP BY movies.id ORDER BY movies.id ASC")

            result = cursor.fetchall()

            if len(result) == 0:
                return []
            else:
                distances = [(distance(a[1], name), a[0], a[1], a[2], a[3]) for a in result]
                titles = list(
                    map(lambda movie: {'id': movie[1], 'title': movie[2], 'tags': movie[3], 'genres': movie[4]},
                        sorted(distances)))[:10]

                for x in titles:
                    x['tags'] = [] if x['tags'] is None else x['tags'].split(',')
                    x['genres'] = [] if x['genres'] is None else x['genres'].split(',')

            return Response(json.dumps(titles), mimetype='application/json', status=200)
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
