import server.utilities
from flask import Flask, Response
import json


def get_users(limit: int, offset: int):
    """
    Retrieves multiple rows from the master_user_feedback_view in the database
    given an int for row limit, and an int for the offset of where the SELECT
    statement starts.
    :param int limit: The limit which restricts how many rows are returned
    :param int offset: This specifies the offset of the first row to return.
    :return: A JSON object containing a list of dictionaries containing
    user information. The 'movie' key in each dictionary is also a list
    of dictionaries, with the 'tag' key for those also being a list of
    dictionaries.
    """

    con, cursor = server.utilities.db_connection()
    try:
        if not server.utilities.is_user():
            return Response({
            }, mimetype='application/json', status=403)
        if not isinstance(limit, int) or not isinstance(offset, int):  # checks if id is an integer
            return Response({
            }, mimetype='application/json', status=400)
        else:
            cursor.execute('''SELECT DISTINCT * FROM FlickPick.master_user_feedback_view '''
                           '''ORDER BY user_id ASC '''
                           '''LIMIT %s OFFSET %s;''', (limit, offset,))
            result = cursor.fetchall()
            if len(result) < 1:
                return Response({
                }, mimetype='application/json', status=404)
            else:

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
                            {"movie_id": row[5], "title": row[6], "rating": row[7], "tags": server.utilities.process_movie_tags(row[8])}]
                        users_list.append(filter_dict)
                        filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])
                    # if there is, just append the movie information to the existing dictionary for that user
                    else:
                        filter_dict["movies"] = {"movie_id": row[5], "title": row[6], "rating": row[7],
                                                 "tags": server.utilities.process_movie_tags(row[8])}
                        for dicts in users_list:
                            if dicts["id"] == row[0]:
                                dicts["movies"].append(filter_dict["movies"])
                        filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])

                return Response(json.dumps(users_list), mimetype='application/json', status=200)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
