from typing import Union

from server.utilities import db_connection


def query_get_movie(id: Union[int, str]):
    # Handle single movies
    # Handle comma separated lists of movies
    #   e.g. id="1,9,5,3"

    con, cursor = db_connection()
    try:
        cursor.execute(
            '''SELECT distinct movies.id, movies.name, group_concat(DISTINCT tags.name ORDER BY tags.name ASC SEPARATOR ',') as 'Tags', '''
            '''group_concat(DISTINCT genre.genre ORDER BY genre.genre ASC SEPARATOR ',') as 'Genres' FROM FlickPick.movies '''
            '''LEFT JOIN tags ON tags.movie_id = movies.id '''
            '''LEFT JOIN genre ON genre.movie_id = movies.id '''
            '''WHERE movies.id = %s;''', (id,))
        result = cursor.fetchall()

        if (len(result)) == 0:
            return None
        else:
            movie_id = result[0][0]
            movie_name = result[0][1]
            if result[0][2] is None:
                tags = [[]]
            else:
                tags = [tags[2].split(',') for tags in result]

            if result[0][3] is None:
                genres = [[]]
            else:
                genres = [genres[3].split(',') for genres in result]

            data = {
                "id": movie_id,
                "title": movie_name,
                "tags": tags[0],
                "genres": genres[0]
            }
            
            return data

    finally:
        con.close()
        cursor.close()
