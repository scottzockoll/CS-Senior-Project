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
        cursor.execute(f"""SELECT mf.user_id, u.firstName, u.lastName, u.email, u.isAdmin, m.name AS 'movieName', GROUP_CONCAT(DISTINCT g.genre ORDER BY g.id ASC SEPARATOR ',') as 'movieGenres', mf.movie_id, mf.rating as 'movieRating', GROUP_CONCAT(DISTINCT tf.tag_id, ',', tf.rating, ',', t.name ORDER BY tf.tag_id ASC SEPARATOR ';') as 'tagInfo'
                            FROM movie_feedback AS mf
                            INNER JOIN users AS u ON u.id = mf.user_id
                            INNER JOIN movies AS m ON m.id = mf.movie_id
                            LEFT JOIN tag_feedback AS tf ON tf.movie_id = mf.movie_id AND tf.user_id=2
                            LEFT JOIN tags AS t ON t.id = tf.tag_id
                            INNER JOIN genre AS g on g.movie_id = mf.movie_id
                            WHERE mf.user_id = {id}
                            GROUP BY mf.movie_id, u.email
                            ORDER BY mf.user_id, mf.movie_id, tf.tag_id;""")
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
            cursor.execute(f"SELECT * FROM users WHERE id = {id}")
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
