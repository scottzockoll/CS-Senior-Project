from mysql.connector import connection


def dbConnection():
    """
    Create connection variable
    Create cursor from connection variable
    Close cursor and connection
    """
    con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                     host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')

    return con

