from server.utilities import db_connection, process_movie_tags, log_exception_and_return_500
from server.auth import is_admin
from flask import Response
import json


def get_users_email_autocomplete(email: str, offset: int, limit: int = 500):
    """
    Get a list of auto-complete suggestions for a partial user's email.
    :param str email: The email to find suggestions for.
    :param int offset: The specified offset for data returned.
    :param int limit: The specified limit for data returned. If not included, default is 500.
    :return: A JSON object containing a list of dictionaries containing
    user information and the movies and tags they have rated.
    """
    con, cursor = db_connection()

    try:
        if not is_admin():
            return Response({}, mimetype='application/json', status=401)
        elif not isinstance(email, str) or not isinstance(offset, int) or not isinstance(limit, int):
            return Response({}, mimetype='application/json', status=400)
        else:
            cursor.execute(f"SELECT user_id, firstName, lastName, email, isAdmin, "
                           f"movieName, movie_id, movieRating, tagInfo FROM master_user_feedback_view "
                           f"WHERE email LIKE '{email}%' LIMIT %s OFFSET %s", (limit, offset))

            result = cursor.fetchall()

            if len(result) == 0:
                return []
            else:
                movie_info = [{'id': i[6], 'title': i[5], 'rating': i[7],
                               'tags': process_movie_tags(i[8])
                               } for i in result]
                data = {
                    "id": result[0][0],
                    "email": result[0][3],
                    "firstName": result[0][1],
                    "lastName": result[0][2],
                    "isAdmin": result[0][4],
                    "movies": movie_info,
                }

                return Response(json.dumps(data), mimetype='application/json', status=200)
    except Exception as e:
        log_exception_and_return_500(e)
    finally:
        cursor.close()
        con.close()
