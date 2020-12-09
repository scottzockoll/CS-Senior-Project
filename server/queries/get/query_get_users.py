import server.utilities
from typing import Union

def query_get_users(limit: Union[int, str], offset: Union[int, str]):
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
                    LEFT JOIN tag_feedback AS tagFeedback ON tagFeedback.movie_id = feedback.movie_id
                        AND (feedback.user_id >= {offset} OR feedback.user_id < {offset+limit})
                    LEFT JOIN tags AS tag ON tag.id = tagFeedback.tag_id
                    INNER JOIN genre AS genres on genres.movie_id = feedback.movie_id
                WHERE
                        feedback.user_id >= {offset}
                    AND feedback.user_id < {offset+limit}
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
            filter_dict = dict.fromkeys(["id", "email", "firstName", "lastName", "isAdmin", "movies"])

            users_list = []

            for row in result:
                # if there is not an instance of the user, create a dictionary in the list for them
                if not any(d['id'] == row[0] for d in users_list):
                    filter_dict["id"] = row[0]
                    filter_dict["email"] = row[3]
                    filter_dict["firstName"] = row[1]
                    filter_dict["lastName"] = row[2]
                    filter_dict["isAdmin"] = row[4] == 1
                    if row[9] is not None:
                        filter_dict["movies"] = [{
                                "id": row[7],
                                "title": row[5],
                                "rating": row[8],
                                "genres": row[6].split(','),
                                "tags": server.utilities.process_movie_tags(row[9]),
                                "feedbackId": row[10]
                        }]
                        users_list.append(filter_dict)
                    else:
                        filter_dict["movies"] = [{
                            "id": row[7],
                            "title": row[5],
                            "rating": row[8],
                            "genres": row[6].split(','),
                            "feedbackId": row[10]
                        }]
                        users_list.append(filter_dict)
                    filter_dict = dict.fromkeys(["id", "email", "firstName", "lastName", "isAdmin", "movies"])
                # if there is, just append the movie information to the existing dictionary for that user
                else:
                    if row[9] is not None:
                        filter_dict["movies"] = {
                            "id": row[7],
                            "title": row[5],
                            "rating": row[8],
                            "genres": row[6].split(','),
                            "tags": server.utilities.process_movie_tags(row[9]),
                            "feedbackId": row[10]
                        }
                        for dicts in users_list:
                            if dicts["id"] == row[0]:
                                dicts["movies"].append(filter_dict["movies"])
                    else:
                        filter_dict["movies"] = {
                            "id": row[7],
                            "title": row[5],
                            "rating": row[8],
                            "genres": row[6].split(','),
                            "feedbackId": row[10]
                        }
                        for dicts in users_list:
                            if dicts["id"] == row[0]:
                                dicts["movies"].append(filter_dict["movies"])

                    filter_dict = dict.fromkeys(["id", "email", "firstName", "lastName", "isAdmin", "movies"])
            return users_list
    finally:
        cursor.close()
        con.close()
