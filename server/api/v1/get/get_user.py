import server.utilities
from flask import Flask, Response
import json


def get_user(id: int):
    """
    Returns a single user by user id
    :param int id: The user id to retrieve
    :return: JSON object with user firstName, lastName, and isAdmin
    """

    def process_single_tag(tag: str):
        split = tag.split(',')
        return {
            'id': split[0],
            'rating': split[1],
            'name': split[2]
        }

    def process_movie_tags(movie: str):
        tag_data = movie.split(';')
        return [process_single_tag(tag) for tag in tag_data]

    con, cursor = server.utilities.db_connection()
    try:
        if not server.utilities.is_user():
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
                movie_info = [{'id': i[5], 'title': i[6], 'rating': i[7],
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
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
