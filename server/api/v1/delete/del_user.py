from server.utilities import db_connection
from server.auth import is_admin, is_current_user
from flask import Response


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
