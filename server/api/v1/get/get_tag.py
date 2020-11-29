from server.utilities import db_connection, log_exception_and_return_500
from server.auth import is_user
from flask import Response


def get_tag(id: int):
    """
    Return a tag by id
    :param int id: The tag id to retrieve
    :return: JSON object of tag id, name and movie id
    """
    con, cursor = db_connection()

    try:
        if not is_user():
            return Response({}, mimetype='application/json', status=403)
        if not isinstance(id, int):     # checks if id is an integer
            return Response({}, mimetype='application/json', status=400)
        else:                           # executes query
            cursor.execute("SELECT name, movie_id FROM tags WHERE id=%s", (id,))
            result = cursor.fetchmany(size=1)

        if len(result) != 1:            # checks if query returned one result
            return Response({}, mimetype='application/json', status=404)
        else:                           # pulls necessary data from result
            name = result[0][0]
            movie_id = result[0][1]

            return Response({
                "id": id,
                "name": name,
                "movie_id": movie_id
            }, mimetype='application/json', status=200)
    except Exception as e:
        log_exception_and_return_500(e)
    finally:
        cursor.close()
        con.close()
