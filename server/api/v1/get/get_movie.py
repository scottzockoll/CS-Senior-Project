from server.utilities import db_connection, is_user
from flask import Response
import json


def get_movie(id: int):
    """
    Return a movie, its genres, and its tags
    :param int id: The movie id to retrieve
    :return: JSON object of movie id, name, and genre tags
    """
    con, cursor = db_connection()
    try:
        if not is_user():  # checks user
            return Response({
            }, mimetype='application/json', status=403)
        if not isinstance(id, int):  # checks if id is an integer
            return Response({
            }, mimetype='application/json', status=400)
        else:  # executes query
            cursor.execute('''SELECT distinct movies.id, movies.name, group_concat(DISTINCT tags.name ORDER BY tags.name ASC SEPARATOR ',') as 'Tags', '''
                           '''group_concat(DISTINCT genre.genre ORDER BY genre.genre ASC SEPARATOR ',') as 'Genres' FROM FlickPick.movies '''
                           '''JOIN tags '''
                           '''ON tags.movie_id = movies.id '''
                           '''JOIN genre '''
                           '''on genre.movie_id = movies.id '''
                           '''WHERE movies.id = %s;''', (id, ))
            result = cursor.fetchall()

            if len(result) < 1:  # make sure there is at least one result returned
                return Response({
                }, mimetype='application/json', status=404)
            else:
                movie_id = result[0][0]
                movie_name = result[0][1]
                tags = [tags[2].split(',') for tags in result]
                genres = [genres[3].split(',') for genres in result]
                data = {
                    "movie_id": movie_id,
                    "movie_name": movie_name,
                    "tags": tags,
                    "genres": genres
                }

                return Response(json.dumps(data), mimetype='application/json', status=200)

    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
