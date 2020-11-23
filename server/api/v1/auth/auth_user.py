import json

from flask import request, Response, session

from server.auth import authenticate, check_update
from time import time


def auth_user(email: str):
    from server import app
    print(f'Attempting authentication for {email}')
    # user = session.get('user')
    # print('Current value...')
    # print(user)
    # print('')
    # if user:
    #     if time() > user['expiration']:
    #         session.pop('user')
    #         session.clear()
    #     else:
    #         return Response(json.dumps(user), status=200)
    #
    # user = authenticate(email, request.form['auth_token'])
    # check_update(user['firstName'], user['lastName'], user['email'])
    #
    # if user is None:
    #     return Response({}, status=401)
    # else:
    #     return Response(json.dumps(user), status=200)
    user = {
        'id': 614,
        'firstName': 'Andrew',
        'lastName': 'Cuccinello',
        'authStatus': 'User',
        'email': 'cuccinela5@students.rowan.edu',
        'expiration': 9999999999
    }
    app.open_session(request)
    session['user'] = user

    print(session.get('user'))
    return Response(json.dumps(user), status=200)
