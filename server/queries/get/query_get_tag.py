from typing import Union

from server.utilities import db_connection


# TODO: Handle comma separated lists of tags (e.g. id="1,9,5,3")
def query_get_tag(id: Union[int, str]):
    """
    Returns a single tag by tag id
    :param Union[int, str] id: The tag id to retrieve
    :return: JSON object with tag id, name, and movie id
    """

    con, cursor = db_connection()
    try:
        cursor.execute("SELECT name, movie_id FROM tags WHERE id=%s", (id,))
        result = cursor.fetchmany(size=1)

        if len(result) != 1:
            return None
        else:
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
