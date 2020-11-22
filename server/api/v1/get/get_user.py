import server.auth
import server.utilities
from flask import Flask, Response
import json


def get_user(id: int):
    """
    Returns a single user by user id
    :param int id: The user id to retrieve
    :return: JSON object with user firstName, lastName, and isAdmin
    """

    con, cursor = server.utilities.db_connection()
    try:
        if not server.auth.is_user():
            return Response({
            }, mimetype='application/json', status=403)
        if not isinstance(id, int):  # checks if id is an integer
            return Response({
            }, mimetype='application/json', status=400)
        else:
            cursor.execute('''SELECT * FROM FlickPick.master_user_feedback_view '''
                           '''WHERE user_id = %s;''', (id,))
            result = cursor.fetchall()
            if len(result) < 1:
                return Response({
                }, mimetype='application/json', status=404)
            else:
                movie_info = [{'id': i[6], 'title': i[5], 'rating': i[7],
                               'tags': server.utilities.process_movie_tags(i[8])
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
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
