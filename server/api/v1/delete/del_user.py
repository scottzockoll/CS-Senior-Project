from server.utilities import db_connection, is_admin
from flask import Response, session, request
from time import time


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


def del_user(id: int):
    """
    Delete a user by id
    :param int id: The user id to delete
    :return: Nothing
    """
    con, cursor = db_connection()

    try:
        if not is_admin() or not is_current_user(id):
            return Response({
            }, mimetype='application/json', status=401)
        elif not isinstance(id, int):  # checks if id is integer
            return Response({
            }, mimetype='application/json', status=400)
        else:  # executes query
            cursor.execute("DELETE FROM users WHERE id=%s", (id,))
            if cursor.rowcount == 1:
                con.commit()
                return Response({
                }, mimetype='application/json', status=200)
            else:
                return Response({
                }, mimetype='application/json', status=404)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
