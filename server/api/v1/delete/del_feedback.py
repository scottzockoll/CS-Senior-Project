import json

from flask import Response

from server.utilities import db_connection
from server.auth import is_current_user


def del_feedback(userId: int):
    """
    Delete all user feedback for tags and movies
    :param int userId: The user whose feedback is being deleted
    :return: Nothing
    """
    con, cursor = db_connection()

    try:
        if not isinstance(userId, int):
            return Response(json.dumps({}), mimetype='application/json', status=400)
        elif not is_current_user(userId):
            return Response(json.dumps({}), mimetype='application/json', status=401)
        else:
            cursor.execute("DELETE m.*, t.* FROM movie_feedback m LEFT JOIN tag_feedback t ON m.user_id = t.user_id "
                           "WHERE m.user_id = %s", (userId,))
            if cursor.rowcount == 0:
                return Response(json.dumps({}), mimetype='application/json', status=404)
            else:
                con.commit()
                return Response(json.dumps({}), mimetype='application/json', status=200)
    except Exception:
        return Response(json.dumps({}), mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()

