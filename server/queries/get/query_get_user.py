import server.utilities
from typing import Union


def query_get_user(id: Union[int, str]):
    """
    Returns a single user by user id
    :param int id: The user id to retrieve
    :return: JSON object with user firstName, lastName, and isAdmin
    """
    con, cursor = server.utilities.db_connection()

    try:
        cursor.execute("SELECT * FROM FlickPick.master_user_feedback_view WHERE user_id = {u};".format(u=id))
        result = cursor.fetchall()
        if cursor.rowcount > 0:
            movie_info = []
            for row in result:
                if row[9] is not None:
                    movie_info.append(
                        dict(id=row[7], title=row[5], rating=row[8], genres=row[6].split(','), tags=server.utilities.process_movie_tags(row[9])))
                else:
                    movie_info.append(
                        dict(id=row[7], title=row[5], rating=row[8], genres=row[6].split(',')))
            data = {
                "id": result[0][0],
                "email": result[0][3],
                "firstName": result[0][1],
                "lastName": result[0][2],
                "isAdmin": result[0][4] == 1,
                "movies": movie_info,
            }
            return data
        else:
            cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            result = cursor.fetchall()
            if cursor.rowcount > 0:
                data = {
                    "id": result[0][0],
                    "email": result[0][3],
                    "firstName": result[0][1],
                    "lastName": result[0][2],
                    "isAdmin": result[0][4] == 1,
                    "movies": []
                }
                return data

    finally:
        cursor.close()
        con.close()
