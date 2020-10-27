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
        else:                               # starts execution of queries
            cursor.execute("SELECT * FROM tag_feedback WHERE user_id=%s", (id,))        # verify if user exists here
            r1 = cursor.fetchmany()
            if len(r1) == 1:
                cursor.execute("DELETE FROM tag_feedback WHERE user_id=%s", (id,))      # deletes if so

            cursor.execute("SELECT * FROM movie_feedback WHERE user_id=%s", (id,))      # verify if user exists here
            r2 = cursor.fetchmany()
            if len(r2) == 1:
                cursor.execute("DELETE FROM movie_feedback WHERE user_id=%s", (id,))    # deletes if so

            cursor.execute("SELECT * FROM users WHERE id=%s", (id,))                    # verify if user exists here
            r3 = cursor.fetchmany(size=1)
            if len(r3) == 1:
                cursor.execute("DELETE FROM users WHERE id=%s", (id,))                  # deletes if so
                con.commit()                                                            # commits all deletes
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
