from mysql.connector import connection


def db_connection():
    """
        Creates a connection to database and creates a cursor to use
        to execute queries within the database.
        NOTE: You MUST close the connection AND cursor when you are
        finished with them.
    """
    con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                     host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')

    cursor = con.cursor()

    return con, cursor


# TODO: Properly define
def is_user():
    return True


# TODO: Properly define
def is_admin():
    return True


# TODO: Properly define
def current_user():
    return True
