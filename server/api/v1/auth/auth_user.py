import json

from flask import session, request
from google.auth.transport import requests
from google.oauth2 import id_token
from server.api.v1.create.create_user import create_user


def google_info(token: str):
    c_id = "962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com"

    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), c_id)

        exp = id_info['exp']
        email = id_info['email']
        name = id_info['name']
        given_name = id_info['given_name']
        family_name = id_info['family_name']

        return given_name, family_name, email, name, exp

    except ValueError:
        pass


def auth_user(email: str):
    # print('form: {}'.format(request.form))
    # if session['email'] == request.form['email']:
    token = request.form['auth_token']
    given_name, family_name, email, name, exp = google_info(token)

    create_user(given_name, family_name, email)

    # create session here

    return json.dumps({'message': 'success'})
