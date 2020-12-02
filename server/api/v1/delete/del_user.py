from server.utilities import db_connection
from server.auth import is_admin, is_current_user
from flask import Response


def del_user(id: int):
    """
    Delete a user by id
    :param int id: The user id to delete
    :return: Nothing
    """
    if not isinstance(id, int):
        return Response({}, mimetype='application/json', status=400)

    con, cursor = db_connection()
    try:
        if not is_admin() and not is_current_user(id):
            return Response({}, mimetype='application/json', status=401)
        else:
            cursor.execute("DELETE FROM users WHERE id=%s", (id,))
            if cursor.rowcount == 1:
                con.commit()
                return Response({}, mimetype='application/json', status=200)
            else:
                return Response({}, mimetype='application/json', status=404)
    except Exception as e:
        print(f'Error in del_user')
        print(e)
        return Response({}, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()
