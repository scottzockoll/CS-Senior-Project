from flask import Flask
from server.api.v1.get.get_user import get_user
from server.api.v1.delete.del_user import del_user
from server.api.v1.get.get_movie import get_movie
from server.api.v1.get.get_movie_autocomplete import get_movie_autocomplete
from server.api.v1.get.get_tag import get_tag
from server.api.v1.get.get_tag_autocomplete import get_tag_autocomplete
from server.api.v1.get.get_feedback import get_feedback
from server.api.v1.get.get_feedback_tags import get_feedback_tags
from server.api.v1.update.update_feedback import update_feedback
from server.api.v1.update.update_feedback_tag import update_feedback_tag
from server.api.v1.create.create_feedback import create_feedback
from server.api.v1.create.create_feedback_tag import create_feedback_tag
from server.api.v1.auth.auth_user import auth_user
from server.api.v1.get.get_recommendations import get_recommendations
from server.api.v1.get.get_users import get_users
from server.api.v1.delete.del_feedback import del_feedback
from server.api.v1.get.get_users_lname_autocomplete import get_users_lname_autocomplete
from server.api.v1.get.get_users_email_autocomplete import get_users_email_autocomplete
from server.api.v1.get.get_users_fname_autocomplete import get_users_fname_autocomplete


def register_api_routes(app: Flask):
    """
    Registers all app API routes
    :param Flask app: The Flask app to prep
    :return: Nothing
    """
    app.route('/api/v1/auth/<string:email>', methods=['POST'])(auth_user)
    app.route('/api/v1/user/<int:id>', methods=['GET'])(get_user)
    app.route('/api/v1/user/<int:id>', methods=['DELETE'])(del_user)
    app.route('/api/v1/movie/<int:id>', methods=['GET'])(get_movie)
    app.route('/api/v1/movie/search/<string:name>', methods=['GET'])(get_movie_autocomplete)
    app.route('/api/v1/tag/<int:id>', methods=['GET'])(get_tag)
    app.route('/api/v1/tag/search/<string:name>/<int:movieId>', methods=['GET'])(get_tag_autocomplete)
    app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['GET'])(get_feedback)
    app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>', methods=['GET'])(get_feedback_tags)
    app.route('/api/v1/feedback/movie/<int:feedbackId>/<float:rating>', methods=['PUT'])(update_feedback)
    app.route('/api/v1/feedback/tags/<int:feedbackId>', methods=['PUT'])(update_feedback_tag)
    app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['POST'])(create_feedback)
    app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>/<int:tagId>', methods=['POST'])(create_feedback_tag)
    app.route('/api/v1/recommendation/<int:user_id>', methods=['GET'])(get_recommendations)
    app.route('/api/v1/user/<int:limit>/<int:offset>', methods=['GET'])(get_users)
    app.route('/api/v1/feedback/<int:userId>', methods=['DELETE'])(del_feedback)
    app.route('/api/v1/user/search/<string:email>/<int:offset>/<int:limit>', methods=['GET'])(get_users_email_autocomplete)
    app.route('/api/v1/user/search/<string:firstName>/<int:offset>/<int:limit>', methods=['GET'])(get_users_fname_autocomplete)
    app.route('/api/v1/user/search/<string:lastName>/<int:offset>/<int:limit>', methods=['GET'])(get_users_lname_autocomplete)
