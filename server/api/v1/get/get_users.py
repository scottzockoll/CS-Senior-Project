
import server.auth
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
    # data = []
    # for idx in range(offset, offset + limit):
    #     movies = []
    #
    #     for idx2 in range(5):
    #         movies.append({
    #             'id': idx2,
    #             'title': f"Movie_{idx2}",
    #             'tags': []
    #         })
    #
    #     data.append({
    #         'id': idx,
    #         'firstName': f'First_{idx}',
    #         'lastName': f'Last_{idx}',
    #         'email': f'Email_{idx}@example.com',
    #         'movies': movies
    #     })
    # return Response(json.dumps(data), status=200)

    con, cursor = server.utilities.db_connection()
    try:
        if not server.auth.is_user():
            return Response({}, mimetype='application/json', status=403)
        if not isinstance(limit, int) or not isinstance(offset, int):  # checks if id is an integer
            return Response({}, mimetype='application/json', status=400)
        else:
            print(offset)
            cursor.execute(f'''SELECT DISTINCT * FROM FlickPick.master_user_feedback_view'''
                           f''' WHERE user_id >= {offset} AND user_id < {offset+limit}'''
                           f''' ORDER BY user_id;''')
            result = cursor.fetchall()
            if len(result) < 1:
                return Response({}, mimetype='application/json', status=404)
            else:

                filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])

                users_list = []

                for row in result:
                    # if there is not an instance of the user, create a dictionary in the list for them
                    if not any(d['id'] == row[0] for d in users_list):
                        filter_dict["id"] = row[0]
                        filter_dict["email"] = row[3]
                        filter_dict["firstName"] = row[1]
                        filter_dict["lastName"] = row[2]
                        filter_dict["isAdmin"] = row[4] == 1
                        filter_dict["movies"] = [
                            {"id": row[6], "title": row[5], "rating": row[7], "tags": server.utilities.process_movie_tags(row[8])}]
                        users_list.append(filter_dict)
                        filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])
                    # if there is, just append the movie information to the existing dictionary for that user
                    else:
                        filter_dict["movies"] = {"id": row[6], "title": row[5], "rating": row[7],
                                                 "tags": server.utilities.process_movie_tags(row[8])}
                        for dicts in users_list:
                            if dicts["id"] == row[0]:
                                dicts["movies"].append(filter_dict["movies"])
                        filter_dict = dict.fromkeys(["id", "email", "first_name", "last_name", "is_admin", "movies"])

                return Response(json.dumps(users_list), mimetype='application/json', status=200)
    except Exception as e:
        server.utilities.log_exception_and_return_500(e)
    finally:
        cursor.close()
        con.close()
