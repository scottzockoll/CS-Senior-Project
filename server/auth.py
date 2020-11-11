import requests
from enum import Enum
from typing import Union, Dict
from google.oauth2 import id_token
from google.auth.transport import requests
from flask import request, session


class AuthStatus(Enum):
    """
    Authentication status of a single user.
    """
    Guest = 'Guest',
    User = 'User',
    Admin = 'Admin'


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

    try:
        token_first_name, token_last_name, token_email, token_expiration = _fetch_token_info(token)
        assert email == token_email

        # TODO: Call our server, check if the user is an admin,
        #  set this to AuthStatus.Admin if they are
        auth_status = AuthStatus.User

        user = {
            'id': 1,  # TODO
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
