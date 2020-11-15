import json

from flask import session, request, Response
from server.auth import authenticate, check_update
from time import time

# session cookies will last 24 hours
SESSION_MAX_AGE = 60 * 60 * 24


def auth_user(email: str):
    # TODO: Add better route for user logging out, cookies expiring, refreshing
    session_id = request.cookies.get('session')
    if session_id:
        user = session.get('user')

        if time() > user['expiration']:
            session.pop('user')
            session.clear()
        else:
            return Response(json.dumps(user), status=200)

    user = authenticate(email, request.form['auth_token'])

    check_update(user['first_name'], user['last_name'], user['email'])

    if user is None:
        return Response({}, status=401)
    else:
        response = Response(json.dumps(user), status=200)
        response.set_cookie("session", user['email'], max_age=SESSION_MAX_AGE)
        session['user'] = user
        return response
