from server.utilities import db_connection
from typing import Union


def query_update_feedback_tag(feedbackId: Union[int, str], rating: Union[int, str]):
    """
    Replace the feedback for a specific tag id
    :param Union[int, str] feedbackId: The feedback id to retrieve
    :param Union[int, str] rating: The rating to apply to the tag
    :return: Nothing
    """
    
    con, cursor = db_connection()
    
    try:
        cursor.execute("UPDATE tag_feedback SET rating={r} WHERE id={f}".format(r = rating, f = feedbackId))
        if cursor.rowcount == 1:
            con.commit()
            return True
        else:
            con.rollback()
            return False
    finally:
        cursor.close()
        con.close()
