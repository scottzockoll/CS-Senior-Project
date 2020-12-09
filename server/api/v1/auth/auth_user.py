import json

from flask import request, Response, session

from server.auth import authenticate, check_update
from time import time


def auth_user(email: str):
    print(f'Attempting authentication for {email}')

    user = authenticate(email, request.form['auth_token'])
    check_update(user['firstName'], user['lastName'], user['email'])

    if user:
        if time() > user['expiration']:
            session.pop('user')
            session.clear()
        else:
            return Response(json.dumps(user), status=200)

    if user is None:
        return Response(json.dumps({}), status=401)
    else:
        return Response(json.dumps(user), status=200)
