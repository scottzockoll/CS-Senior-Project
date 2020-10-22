from mysql.connector import connection


def db_connection():
    """
        Make sure to close cursor and connection after use
    """
    con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                     host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')

    cursor = con.cursor()

    return con, cursor

