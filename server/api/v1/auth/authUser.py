from flask import session, request

def authUser(email: str):
    if email in session:
        # make sure session['email'] == request.