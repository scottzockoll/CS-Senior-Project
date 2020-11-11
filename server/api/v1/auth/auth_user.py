import json

from flask import session, request

from server.utilities import db_connection
from flask import Response
from server.auth import authenticate
from time import time


# session cookies will last 24 hours
SESSION_MAX_AGE = 60*60*24


def verify_user(firstName: str, lastName: str, email: str):
    con, cursor = db_connection()

    try:
        if not isinstance(firstName, str) or not isinstance(lastName, str) or not isinstance(email, str):
            return Response({
            }, mimetype='application/json', status=400)
        else:
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            result = cursor.fetchmany(size=1)

            if len(result) == 1:
                return Response({
                }, mimetype='application/json', status=200)
            else:
                cursor.execute("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, 0)",
                               (firstName, lastName, email))
                con.commit()
                return Response({
                }, mimetype='application/json', status=200)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()


def auth_user(email: str):
    session_id = request.cookies.get('session')
    if session_id:
        user = session.get('user')

        if user['expiration'] > time():
            session.pop('user')
        else:
            return Response(json.dumps(user), status=200)

    user = authenticate(email, request.form['auth_token'])

    if user is None:
        return Response({}, status=401)
    else:
        response = Response(json.dumps(user), status=200)
        response.set_cookie("session", user['email'], max_age=SESSION_MAX_AGE)
        session['user'] = user
        return response
