from server.utilities import db_connection
from flask import Response


# Temporary function until we decide on a universal one
def is_admin():
    return True


# Temporary function until we decide on a universal one
def current_user():
    return True


def del_user(id: int):
    """
    Delete a user by id
    :param int id: The user id to delete
    :return: Nothing
    """
    con, cursor = db_connection()

    try:
        if not current_user():              # checks if the logged in user is attempting function (will change)
            return Response({
            }, mimetype='application/json', status=403)
        elif not is_admin():                # checks if the user attempting function is admin (will change)
            return Response({
            }, mimetype='application/json', status=401)
        elif not isinstance(id, int):       # checks if id is integer
            return Response({
            }, mimetype='application/json', status=400)
        else:                               # executes query
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