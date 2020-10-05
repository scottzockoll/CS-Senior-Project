from flask import Flask


def register_api_routes(app: Flask):
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
    return {
        "id": id,
        "email": "example@example.com",
        "firstName": "Joe",
        "lastName": "Smith",
        "isAdmin": True
    }, 200


def del_user(id: int):
    """
    Delete a user by id
    :param id: The user id to delete
    :return:
    """
    return {
        "id": id,
        "result": "OK"
    }, 200


def update_user(id: int):
    return {
        "id": id,
        "result": "OK"
    }, 200


def create_user():
    return {
        "id": 999,
        "result": "Created"
    }, 201


def get_movie(id: int):
    return {
        "movie_id": id,
        "movie_name": "Terminator",
        "genres": ["Action", "Science Fiction"]
    }, 200


def get_movie_autocomplete(name: str):
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


def get_tag(id: int):
    return {
        "id": id,
        "name": "Science Fiction",
        "movie_id": 999
    }, 200


def get_tag_autocomplete(name: str, movieId: int):
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
    return {
        "id": 999,
        "request": "OK"
    }, 200


def get_feedback_tags(userId: int, movieId: int):
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


def update_feedback(feedbackId: int):
    return {
        "id": feedbackId,
        "request": "OK"
    }, 200


def update_feedback_tag(feedbackId: int):
    return {
        "id": feedbackId,
        "request": "OK"
    }, 200


def create_feedback(userId: int, movieId: int):
    return {
        "id": movieId,
        "result": "Created"
    }, 201


def create_feedback_tag(userId: int, movieId: int, tagId: int):
    return {
        "id": tagId,
        "result": "Created"
    }, 201


def get_recommendations(userId: int):
    return {
        "movies": [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
    }, 200
