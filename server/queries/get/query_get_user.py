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
        cursor.execute(
            f"""SELECT
                    feedback.user_id,
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.isAdmin,
                    movie.name AS 'movieName',
                    GROUP_CONCAT(DISTINCT genres.genre ORDER BY genres.id ASC SEPARATOR ',') as 'movieGenres',
                    feedback.movie_id,
                    feedback.rating as 'movieRating',
                    GROUP_CONCAT(DISTINCT tagFeedback.tag_id, ',', tagFeedback.rating, ',', tag.name ORDER BY tagFeedback.tag_id ASC SEPARATOR ';') 
                        as 'tagInfo',
                    feedback.id as 'feedbackId'
                FROM movie_feedback AS feedback
                    INNER JOIN users AS user ON user.id = feedback.user_id
                    INNER JOIN movies AS movie ON movie.id = feedback.movie_id
                    LEFT JOIN tag_feedback AS tagFeedback ON tagFeedback.movie_id = feedback.movie_id AND tagFeedback.user_id={id}
                    LEFT JOIN tags AS tag ON tag.id = tagFeedback.tag_id
                    INNER JOIN genre AS genres on genres.movie_id = feedback.movie_id
                WHERE feedback.user_id = {id}
                GROUP BY
                    feedback.movie_id,
                    user.email
                ORDER BY
                    feedback.user_id,
                    feedback.movie_id,
                    tagFeedback.tag_id;"""
        )
        result = cursor.fetchall()
        if cursor.rowcount > 0:
            movie_info = []
            for row in result:
                if row[9] is not None:
                    movie_info.append(
                        dict(
                            id=row[7],
                            title=row[5],
                            rating=row[8],
                            genres=row[6].split(','),
                            tags=server.utilities.process_movie_tags(row[9]),
                            feedbackId=row[10]
                        )
                    )
                else:
                    movie_info.append(
                        dict(
                            id=row[7],
                            title=row[5],
                            rating=row[8],
                            genres=row[6].split(','),
                            feedbackId=row[10]
                        )
                    )
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
