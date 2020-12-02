from typing import Union

from server.utilities import db_connection


def query_get_tag(id: Union[int, str]):
    # Handle single movies
    # Handle comma separated lists of movies
    #   e.g. id="1,9,5,3"

    con, cursor = db_connection()
    try:
        cursor.execute("SELECT name, movie_id FROM tags WHERE id=%s", (id,))
        result = cursor.fetchmany(size=1)

        if len(result) != 1:            # checks if query returned one result
            return None
        else:                           # pulls necessary data from result
            name = result[0][0]
            movie_id = result[0][1]
            
            data = {
                "id": id,
                "name": name,
                "movie_id": movie_id
            }

            return data
    finally:
        con.close()
        cursor.close()
