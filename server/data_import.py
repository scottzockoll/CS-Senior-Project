import pandas as pd
import time
from mysql.connector import connection
import random

start_time = time.time()

# This will change depending on dataset being used
core_folder = '../dataset/ml-latest-small/'

# DataFrames from CSV's
movies = pd.read_csv(core_folder + 'movies.csv')
movie_df = pd.DataFrame(movies, columns=['movieId', 'title', 'genres'])

ratings = pd.read_csv(core_folder + 'ratings.csv')
rating_df = pd.DataFrame(ratings, columns=['userId', 'movieId', 'rating', 'timestamp'])

tags = pd.read_csv(core_folder + 'tags.csv')
tag_df = pd.DataFrame(tags, columns=['userId', 'movieId', 'tag'])

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

# Movie ID and Title from movies.csv
for m_row in movie_df.itertuples():
    mt = [m_row.movieId, m_row.title]
    movieTable.append(mt)

# Movie ID and Genre from movies.csv
for g_row in movie_df.itertuples():
    g_list = g_row.genres.split("|")
    for x in g_list:
        gt = [g_row.movieId, x]
        genreTable.append(gt)

# User ID, Movie ID and Rating from ratings.csv
for mf_row in rating_df.head().itertuples():
    mft = [mf_row.rating, mf_row.movieId, mf_row.userId]
    movie_feedbackTable.append(mft)

# Tag name, Movie ID and User ID from tags.csv
tagID = 1
for t_row in tag_df.itertuples():
    tt = [t_row.tag, t_row.movieId]
    tft = [5, t_row.movieId, t_row.userId, tagID]
    tagID += 1
    tagsTable.append(tt)
    tag_feedbackTable.append(tft)

# Fake User Data Creation
# Converts baby-names.csv and surnames.csv DataFrames to Lists
first = fName_df['name'].tolist()
last = lName_df['name'].tolist()

# Creates user data tuples using the lists
for i in range(1, 611):  # 610 entries since ratings.csv has 610 different userID's (this is only for fake data)
    first_name = str(random.choice(first))
    last_name = str(random.choice(last)).lower().title()
    email = first_name.lower() + last_name.lower() + "@s.r.e"   # s.r.e = students.rowan.edu
    ut = [first_name, last_name, email, 1]                      # everyone is made an admin for time being
    userTable.append(ut)

# Connection to Database
d_con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                   host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')
cursor = d_con.cursor()

# Batch query executions per table using tuple lists (ONLY RUN IF TABLES ARE EMPTY AND AUTO_INCREMENT IS SET BACK TO 1)
cursor.executemany("INSERT INTO movies (id, name) VALUES (%s, %s)", movieTable)
cursor.executemany("INSERT INTO genre (movie_id, genre) VALUES (%s, %s)", genreTable)
cursor.executemany("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, %s)", userTable)
cursor.executemany("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES (%s, %s, %s)", movie_feedbackTable)
cursor.executemany("INSERT INTO tags (name, movie_id) VALUES (%s, %s)", tagsTable)
cursor.executemany("INSERT INTO tag_feedback (rating, movie_id, user_id, tag_id) VALUES (%s, %s, %s, %s)", tag_feedbackTable)

d_con.commit()

cursor.close()
d_con.close()

print(time.time() - start_time)
