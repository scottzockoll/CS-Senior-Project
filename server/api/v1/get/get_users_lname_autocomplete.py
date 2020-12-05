from server.utilities import db_connection, process_movie_tags
from server.auth import is_admin
from flask import Response
import server.utilities
import json


def get_users_lname_autocomplete(lastName: str, offset: int, limit: int = 500):
    """
    Get a list of auto-complete suggestions for a partial user's last name.
    :param str lastName: The last name to find suggestions for.
    :param int offset: The specified offset for data returned.
    :param int limit: The specified limit for data returned. If not included, default is 500.
    :return: A JSON object containing a list of dictionaries containing
    user information and the movies and tags they have rated.
    """
    con, cursor = db_connection()

    cursor.execute(f"SELECT user_id, firstName, lastName, email, isAdmin, "
                               f"movieName, movie_id, movieRating, tagInfo FROM master_user_feedback_view "
                               f"WHERE lastName LIKE '{lastName}%'", (limit, offset))

    result = cursor.fetchall()
    filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])

    users_list = []
    for row in result:
        # if there is not an instance of the user, create a dictionary in the list for them
        if not any(d['id'] == row[0] for d in users_list):
            filter_dict["id"] = row[0]
            filter_dict["email"] = row[3]
            filter_dict["first_name"] = row[1]
            filter_dict["last_name"] = row[2]
            filter_dict["is_admin"] = row[4]
            filter_dict["movies"] = [
                {"movie_id": row[6], "title": row[5], "rating": row[7], "tags": server.utilities.process_movie_tags(row[8])}]
            users_list.append(filter_dict)
            filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])
        # if there is, just append the movie information to the existing dictionary for that user
        else:
            filter_dict["movies"] = {"movie_id": row[6], "title": row[5], "rating": row[7],
                                     "tags": server.utilities.process_movie_tags(row[8])}
            for dicts in users_list:
                if dicts["id"] == row[0]:
                    dicts["movies"].append(filter_dict["movies"])
            filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])
    return Response(json.dumps(users_list), mimetype='application/json', status=200)

    try:
        if not is_admin():
            return Response({}, mimetype='application/json', status=401)
        elif not isinstance(lastName, str) or not isinstance(offset, int) or not isinstance(limit, int):
            return Response({}, mimetype='application/json', status=400)
        else:
            cursor.execute(f"SELECT user_id, firstName, lastName, email, isAdmin, "
                           f"movieName, movie_id, movieRating, tagInfo FROM master_user_feedback_view "
                           f"WHERE lastName LIKE '{lastName}%' LIMIT %s OFFSET %s", (limit, offset))

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
    except Exception:
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
