import json

from flask import session, request, make_response
from google.auth.transport import requests
from google.oauth2 import id_token
from server.utilities import db_connection
from flask import Response


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
    # print('form: {}'.format(request.form))
    # if session['email'] == request.form['email']:
    #session["email"] = email
    token = request.form['auth_token']
    given_name, family_name, email, name, exp = google_info(token)

    verify_user(given_name, family_name, email)

    #res = make_response()
    #res.set_cookie('user_token', token, domain='127.0.0.1')
    #return session["email"]

'''
    if "email" in session:
        test = session["email"]
        #res = make_response(Response({}, mimetype='application/json', status=200))
        #res.set_cookie('email', test)
        #return res
        return Response({
        }, mimetype='application/json', status=200)
    else:
        return Response({
        }, mimetype='application/json', status=404)
'''
