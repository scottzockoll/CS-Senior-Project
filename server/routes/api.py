from flask import Flask
from server.api.v1.delete.del_user import del_user
from server.api.v1.get.get_tag import get_tag
from server.api.v1.get.get_movie import get_movie
from server.api.v1.create.createFeedbackTag import create_feedback_tag
from server.api.v1.create.createFeedback import create_feedback
from server.api.v1.update.updateFeedback import update_feedback
from server.api.v1.update.updateFeedbackTag import update_feedback_tag


def register_api_routes(app: Flask):
    """
    Registers all app API routes
    :param Flask app: The Flask app to prep
    :return: Nothing
    """
    app.route('/api/v1/user/<int:id>', methods=['GET'])(get_user)
    app.route('/api/v1/user/<int:id>', methods=['DELETE'])(del_user)
    app.route('/api/v1/user/<int:id>', methods=['PATCH'])(update_user)
    app.route('/api/v1/user', methods=['POST'])(create_user)
    app.route('/api/v1/movie/<int:id>', methods=['GET'])(get_movie)
    app.route('/api/v1/movie/search/<string:name>', methods=['GET'])(get_movie_autocomplete)
    app.route('/api/v1/tag/<int:id>', methods=['GET'])(get_tag)
    app.route('/api/v1/tag/search/<string:name>/<int:movieId>', methods=['GET'])(get_tag_autocomplete)
    app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['GET'])(get_feedback)
    app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>', methods=['GET'])(get_feedback_tags)
    app.route('/api/v1/feedback/movie/<int:feedbackId>', methods=['PUT'])(update_feedback)
    app.route('/api/v1/feedback/tags/<int:feedbackId>', methods=['PUT'])(update_feedback_tag)
    app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['POST'])(create_feedback)
    app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>/<int:tagId>', methods=['POST'])(create_feedback_tag)
    app.route('/api/v1/recommendation/<int:userId>', methods=['GET'])(get_recommendations)


def get_user(id: int):
    """
    Returns a single user by user id
    :param int id: The user id to retrieve
    :return: JSON object with user firstName, lastName, and isAdmin
    """

    data = []
    for idx in range(id, id + 50):
        data.append({
            "id": idx,
            "email": f"example{idx}@example.com",
            "firstName": f"First_{idx}",
            "lastName": f"Last_{idx}",
            "isAdmin": idx % 2 == 0
        })


def update_user(id: int):
    """
    Partially update a user by user id
    :param int id: The user id to update
    :return: Nothing
    """
    return {
        "id": id,
        "result": "OK"
    }, 200


def create_user():
    """
    Create a new user
    :param: Nothing
    :return: JSON object of user id
    """
    return {
        "id": 999,
        "result": "Created"
    }, 201


def get_movie_autocomplete(name: str):
    """
    Get a list of auto-complete suggestions for a partial movie title
    :param str name: The movie title to find suggestions for
    :return: JSON object of movies array containing movie id and title
    """
    return {
        "movies": [{
            "id": 11,
            "title": "Terminator II: Judgment Day"
        },
            {
            "id": 22,
            "title": "The Truman Show"
        },
            {
            "id": 33,
            "title": "The Terminal"
        }]
    }, 200


def get_tag_autocomplete(name: str, movieId: int):
    """
    Get a list of auto-complete suggestions for a partial tag. The same tag may exist across multiple movies, this method does not return every instance of a tag, only unique tags
    :param str name: The tag name to find suggestions for
    :param int movieId: The movie id to retrieve
    :return: JSON object of tags array containing tag name
    """
    return {
        "tags": [{
            "name": "Action"
        },
            {
            "name": "Science Fiction"
        },
            {
            "name": "Comedy"
        }]
    }, 200


def get_feedback(userId: int, movieId: int):
    """
    Return the user’s feedback of the specified movie id
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of movie id and rating
    """
    return {
        "id": 999,
        "rating": 3.0,
        "request": "OK"
    }, 200


def get_feedback_tags(userId: int, movieId: int):
    """
    Return the user’s feedback on tags of a specific movie
    :param int userId: The user id to retrieve
    :param int movieId: The movie id to retrieve
    :return: JSON object of feedbacks array containing movie id, tag id, and rating
    """
    return {
        "feedbacks": [{
            "id": 111,
            "tag_id": 222,
            "rating": 3.5
        },
            {
            "id": 333,
            "tag_id": 444,
            "rating": 1.0
        },
            {
            "id": 555,
            "tag_id": 666,
            "rating": 4.5
        }]
    }, 200


def get_recommendations(userId: int):
    """
    Get the top 10 recommendations for a specified user
    :param int userId: The user id to retrieve
    :return: JSON object of movies int array
    """
    return {
        "movies": [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
    }, 200
