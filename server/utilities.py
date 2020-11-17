from flask import session
from mysql.connector import connection
from flask import session, request
from time import time


def db_connection():
    """
        Creates a connection to database and creates a cursor to use
        to execute queries within the database.
        NOTE: You MUST close the connection AND cursor when you are
        finished with them.
    """
    con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                     host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')

    cursor = con.cursor()

    return con, cursor


def is_user():
    """
        Checks to see if a user is signed in.
        :return: Boolean
    """

    session_id = request.cookies.get('session')
    if session_id:
        user = session.get('user')

        if user['expiration'] > time():
            session.pop('user')
        else:
            if user['auth_status'] == "User":
                return True
            else:
                return False


def is_admin():
    """
        Checks to see if a user is signed in with
        admin privileges.
        :return: Boolean
    """

    session_id = request.cookies.get('session')
    if session_id:
        user = session.get('user')

        if user['expiration'] > time():
            session.pop('user')
        else:
            if user['auth_status'] == "Admin":
                return True
            else:
                return False


def is_current_user(id: int):
    """
        Checks to see if the id of the user signed in matches
        the id trying to be deleted.
        NOTE: if_current_user is false, is_admin must be true
        when checking.
        :param id: The id of the user being deleted
        :return: Boolean
    """
    session_id = request.cookies.get('session')
    if session_id:
        user = session.get('user')

        if user['expiration'] > time():
            session.pop('user')
        else:
            if user['id'] == id:
                return True
            else:
                return False


def process_single_tag(tag: str):
    """
        This is called by process_movie_tags to create
        a dictionary for each tag. It turns the list indice
        from the prior function into a dictionary wherein the
        id, user's rating, and the name of the tag are contained.
        :param str tag: The string from the list created by process_movie_tags
        :return: A dictionary with key, value pairs for
        'tag_id', 'rating', and 'name'
    """
    split = tag.split(',')
    return {
            'tag_id': split[0],
            'rating': split[1],
            'name': split[2]
        }


def process_movie_tags(movie: str):
    """
        Receives a string with all of a movies tags and their info.
        It splits at the ';' character to create a list where each
        indice has a single tag's info. It is further processed by
        process_single_tag.
        :param str movie: This is a string of all the tags and their info
         for a movie.
        :return: A list of dictionaries with key, value pairs for
        'tag_id', 'rating', and 'name'.
    """
    if movie is None:
        pass
    else:
        tag_data = movie.split(';')
        return [process_single_tag(tag) for tag in tag_data]
