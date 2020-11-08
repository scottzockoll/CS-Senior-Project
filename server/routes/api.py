from flask import Flask
from server.api.v1.get.get_user import get_user
from server.api.v1.delete.del_user import del_user
# from server.api.v1.update.update_user import update_user
# from server.api.v1.create.create_user import create_user
from server.api.v1.get.get_movie import get_movie
from server.api.v1.get.get_movie_autocomplete import get_movie_autocomplete
from server.api.v1.get.get_tag import get_tag
# from server.api.v1.get.get_tag_autocomplete import get_tag_autocomplete
from server.api.v1.get.get_feedback import get_feedback
from server.api.v1.get.get_feedback_tags import get_feedback_tags
from server.api.v1.update.update_feedback import update_feedback
from server.api.v1.update.update_feedback_tag import update_feedback_tag
from server.api.v1.create.create_feedback import create_feedback
from server.api.v1.create.create_feedback_tag import create_feedback_tag
# from server.api.v1.get.get_recommendations import get_recommendations


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


def get_recommendations(userId: int):
    """
    Get the top 10 recommendations for a specified user
    :param int userId: The user id to retrieve
    :return: JSON object of movies int array
    """
    return {
        "movies": [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
    }, 200

