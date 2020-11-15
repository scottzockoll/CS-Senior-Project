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
    result_set = {}

    try:
        if not is_user():
            return Response({
            }, mimetype='application/json', status=403)
        else:
            cursor.execute(f"SELECT id, name FROM tags WHERE movie_id=%s AND name LIKE '{name}__%'", (movieId,))

            result = cursor.fetchall()

            for a in result:        # creates a unique set from result list
                result_set[a[1]] = a

            result_set = list(result_set.values())  # turns set back to a list

            if len(result_set) == 0:
                return []
            else:
                distances = [(distance(a[1], name), a[1], a[0]) for a in result_set]
                tag = list(map(lambda movie: {'id': movie[2], 'tag': movie[1]}, sorted(distances)))[:10]

                return Response({
                    "tags": tag
                }, mimetype='application/json', status=200)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
