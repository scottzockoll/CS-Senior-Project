from server.utilities import db_connection
from flask import Response


def create_user(firstName: str, lastName: str, email: str):
    con, cursor = db_connection()

    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        result = cursor.fetchmany(size=1)

        if len(result) == 1:
            print("User Exists")
        else:
            cursor.execute("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, 1)", (firstName, lastName, email))
            con.commit()
            print("USER CREATED")
    except Exception:
        print("ERROR")
    finally:
        cursor.close()
        con.close()