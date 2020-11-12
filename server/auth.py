import requests
from enum import Enum
from typing import Union, Dict
from google.oauth2 import id_token
from google.auth.transport import requests
from flask import request, session, Response
from server.utilities import db_connection


class AuthStatus(Enum):
    """
    Authentication status of a single user.
    """
    Guest = 'Guest',
    User = 'User',
    Admin = 'Admin'


def verify_user(firstName: str, lastName: str, email: str):
    """
    Check if the user signing in is a user in the database. If not,
    an entry is created in the user table.
    :param firstName: First name of the user signing in
    :param lastName: Last name of the user signing in
    :param email: Email address of the user signing in
    :return: Authorization status of the request.
    """
    con, cursor = db_connection()

    try:
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


def check_update(firstName: str, lastName: str, email: str):
    """
    Check if the user signing in has updated personal details and update values
    in the database if need be.
    NOTE: Only firstName and lastName can be updated
    :param firstName: First name of the user signing in
    :param lastName: Last name of the user signing in
    :param email: Email address of the user signing in
    :return: Authorization status of the request.
    """
    con, cursor = db_connection()

    try:
        cursor.execute("SELECT firstName, lastName FROM users WHERE email=%s", (email,))
        result = cursor.fetchmany(size=1)

        if result[0][0] != firstName:
            cursor.execute("UPDATE users SET firstName=%s WHERE email=%s", (firstName, email,))

        if result[0][1] != lastName:
            cursor.execute("UPDATE users SET lastName=%s WHERE email=%s", (lastName, email,))

        con.commit()
        return Response({
        }, mimetype='application/json', status=200)
    except Exception:
        return Response({
        }, mimetype='application/json', status=500)
    finally:
        cursor.close()
        con.close()


def _fetch_token_info(token: str) -> (str, str, str, int):
    gapi_endpoint = "962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com"
    request = requests.Request()
    response = id_token.verify_oauth2_token(
        token,
        request,
        gapi_endpoint
    )

    given_name = response['given_name']
    family_name = response['family_name']
    email = response['email']
    expiration = response['exp']

    return given_name, family_name, email, expiration


def authenticate(email: str, token: str) -> Union[Dict, None]:
    """
    Validate the user has the ability to login with the given token.
    :param email: Email address to attempt to validate against
    :param token: OAuth token to attempt to validate
    :return: Authorization status of the request.
    """
    con, cursor = db_connection()

    try:
        token_first_name, token_last_name, token_email, token_expiration = _fetch_token_info(token)
        assert email == token_email

        verify_user(token_first_name, token_last_name, token_email)

        cursor.execute("SELECT id, isAdmin FROM users WHERE email=%s", (token_email,))
        result = cursor.fetchmany(size=1)

        if result[0][1] == 1:
            auth_status = AuthStatus.Admin
        else:
            auth_status = AuthStatus.User

        user = {
            'id': result[0][0],
            'first_name': token_first_name,
            'last_name': token_last_name,
            'auth_status': auth_status.value[0],
            'email': token_email,
            'expiration': token_expiration
        }

        print(f"Login success: {user['last_name']}, {user['first_name']} ({user['email']})")
        return user
    except (AssertionError, ValueError):
        print(f'Warning: Invalid login attempt for {email} from {request.remote_addr}.')
        return None
    finally:
        cursor.close()
        con.close()

