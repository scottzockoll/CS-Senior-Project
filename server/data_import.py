import pandas as pd
import time
import random
from server.utilities import db_connection

start_time = time.time()

# This will change depending on dataset being used
core_folder = '../dataset/movie_lens/100k/'

# DataFrames from CSV's
movies = pd.read_csv(core_folder + 'movies.csv')
movie_df = pd.DataFrame(movies, columns=['movieId', 'title', 'genres'])

ratings = pd.read_csv(core_folder + 'ratings.csv')
rating_df = pd.DataFrame(ratings, columns=['userId', 'movieId', 'rating', 'timestamp'])

tags = pd.read_csv(core_folder + 'tags.csv')
tag_df = pd.DataFrame(tags, columns=['userId', 'movieId', 'tag']).fillna(0)

# Fake User Data
fName = pd.read_csv('../dataset/user_data/baby-names.csv')
fName_df = pd.DataFrame(fName, columns=['name'])

# Fake User Data
lName = pd.read_csv('../dataset/user_data/surnames.csv')
lName_df = pd.DataFrame(lName, columns=['name'])

# Tuple lists per table
movieTable = []
genreTable = []
userTable = []
tagsTable = []
tag_feedbackTable = []
movie_feedbackTable = []

# Connection to Database
d_con, cursor = db_connection()

"""
# These need to be executed everytime a new import is attempted (or for general testing purposes)
cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

cursor.execute("TRUNCATE TABLE tag_feedback")
cursor.execute("TRUNCATE TABLE movie_feedback")
cursor.execute("TRUNCATE TABLE genre")
cursor.execute("TRUNCATE TABLE tags")
cursor.execute("TRUNCATE TABLE users")
cursor.execute("TRUNCATE TABLE movies")

cursor.execute("ALTER TABLE tag_feedback AUTO_INCREMENT=1")
cursor.execute("ALTER TABLE movie_feedback AUTO_INCREMENT=1")
cursor.execute("ALTER TABLE genre AUTO_INCREMENT=1")
cursor.execute("ALTER TABLE tags AUTO_INCREMENT=1")
cursor.execute("ALTER TABLE users AUTO_INCREMENT=1")

cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

d_con.commit()
#################################################################################################
"""

# Movie ID and Title from movies.csv
for m_row in movie_df.itertuples():
    mt = [m_row.movieId, m_row.title]
    movieTable.append(mt)
    if len(movieTable) % 10000 == 0 and len(movies) != 0:
        cursor.executemany("INSERT INTO movies (id, name) VALUES (%s, %s)", movieTable)
        d_con.commit()
        movieTable.clear()
cursor.executemany("INSERT INTO movies (id, name) VALUES (%s, %s)", movieTable)
"""

"""
# Movie ID and Genre from movies.csv
for g_row in movie_df.itertuples():
    g_list = g_row.genres.split("|")
    for x in g_list:
        gt = [g_row.movieId, x]
        genreTable.append(gt)
        if len(genreTable) % 100000 == 0 and len(genreTable) != 0:
            cursor.executemany("INSERT INTO genre (movie_id, genre) VALUES (%s, %s)", genreTable)
            d_con.commit()
            genreTable.clear()
cursor.executemany("INSERT INTO genre (movie_id, genre) VALUES (%s, %s)", genreTable)
"""

"""
# Fake User Data Creation
# Converts baby-names.csv and surnames.csv DataFrames to Lists
first = fName_df['name'].tolist()
last = lName_df['name'].tolist()

# Creates user data tuples using the lists
for i in range(1, 162542):  # (1, 611) for 100K ---- (1, 162542) for 25M
    first_name = str(random.choice(first))
    last_name = str(random.choice(last)).lower().title()
    email = first_name.lower() + last_name.lower() + "@s.r.e"  # s.r.e = students.rowan.edu
    ut = [first_name, last_name, email, 1]  # everyone is made an admin for time being
    userTable.append(ut)
    if len(userTable) % 100000 == 0 and len(userTable) != 0:
        cursor.executemany("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, %s)", userTable)
        d_con.commit()
        userTable.clear()
cursor.executemany("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, %s)", userTable)
"""

"""
# User ID, Movie ID and Rating from ratings.csv
for mf_row in rating_df.itertuples():
    mft = [mf_row.rating, mf_row.movieId, mf_row.userId]
    movie_feedbackTable.append(mft)
    if len(movie_feedbackTable) % 100000 == 0 and len(movie_feedbackTable) != 0:
        cursor.executemany("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES (%s, %s, %s)",
                           movie_feedbackTable)
        d_con.commit()
        movie_feedbackTable.clear()
cursor.executemany("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES (%s, %s, %s)", movie_feedbackTable)
"""

"""
# Tag name, Movie ID and User ID from tags.csv
tagID = 1
for t_row in tag_df.itertuples():
    tt = [t_row.tag, t_row.movieId]
    tft = [5, t_row.movieId, t_row.userId, tagID]
    tagID += 1
    tagsTable.append(tt)
    tag_feedbackTable.append(tft)
    if len(tagsTable) % 100000 == 0 and len(tagsTable) != 0:
        cursor.executemany("INSERT INTO tags (name, movie_id) VALUES (%s, %s)", tagsTable)

        d_con.commit()
        tagsTable.clear()
    if len(tag_feedbackTable) % 100000 == 0 and len(tag_feedbackTable) != 0:
        cursor.executemany("INSERT INTO tag_feedback (rating, movie_id, user_id, tag_id) VALUES (%s, %s, %s, %s)",
                           tag_feedbackTable)
        d_con.commit()
        tag_feedbackTable.clear()
cursor.executemany("INSERT INTO tags (name, movie_id) VALUES (%s, %s)", tagsTable)
cursor.executemany("INSERT INTO tag_feedback (rating, movie_id, user_id, tag_id) VALUES (%s, %s, %s, %s)",
                   tag_feedbackTable)


d_con.commit()

cursor.close()
d_con.close()

print(time.time() - start_time)

""""
---25M Dataset Results---
all at once = 1763.9297106266022
clearing the entire DB = 8.712500810623169
movies = 14.889225006103516
genre = 14.225030660629272
users = 26.28990864753723
movie_feedback = 1886.1399955749512
tags/tag_feedback = 156.2953929901123
"""
