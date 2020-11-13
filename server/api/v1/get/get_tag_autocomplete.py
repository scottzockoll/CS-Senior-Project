from server.utilities import db_connection, is_user
from Levenshtein import distance
from flask import Response


def get_tag_autocomplete(name: str, movieId: int):
    """
    Get a list of auto-complete suggestions for a partial tag. The same tag may exist across multiple movies,
    this method does not return every instance of a tag, only unique tags
    :param str name: The tag name to find suggestions for
    :param int movieId: The movie id to retrieve
    :return: JSON object of tags array containing tag name
    """
    con, cursor = db_connection()

    try:
        if not is_user():           # TODO: Properly define in utilities.py
            return Response({
            }, mimetype='application/json', status=403)
        else:
            cursor.execute(f"SELECT DISTINCT name FROM tags WHERE movie_id=%s AND name LIKE '{name}__%'", (movieId,))

            result = cursor.fetchall()

            if len(result) == 0:
                return []
            else:
                distances = [(distance(a[0], name), a[0]) for a in result]
                tag = list(map(lambda movie: {'tag': movie[1]}, sorted(distances)))[:10]

                return Response({            # TODO: Find out if this needs to return movie_id and id
                    "tags": tag
                }, mimetype='application/json', status=200)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()

