import mysql.connector
import pandas as pd
import time
from mysql.connector import connection
import csv
import random

start_time = time.time()

# DataFrames from CSV's
movies = pd.read_csv(r'../dataset/ml-latest-small/movies.csv')
movie_df = pd.DataFrame(movies, columns=['movieId', 'title', 'genres'])

ratings = pd.read_csv(r'../dataset/ml-latest-small/ratings.csv')
rating_df = pd.DataFrame(ratings, columns=['userId', 'movieId', 'rating'])

tags = pd.read_csv(r'../dataset/ml-latest-small/tags.csv')
tag_df = pd.DataFrame(tags, columns=['userId', 'movieId', 'tag'])

# Fake User Data
fName = pd.read_csv(r'../dataset/user_data/baby-names.csv')
fName_df = pd.DataFrame(fName, columns=['name'])

# Fake User Data
lName = pd.read_csv(r'../dataset/user_data/surnames.csv')
lName_df = pd.DataFrame(lName, columns=['name'])

# Tuple lists per table
movieTable = []
genreTable = []
userTable = []
tagsTable = []
#tag_feedbackTable = []
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
for mf_row in rating_df.itertuples():
    mft = [mf_row.rating, mf_row.movieId, mf_row.userId]
    movie_feedbackTable.append(mft)

# Sorting movieId column for convenience, then comparing between movies.csv and tags.csv to make sure a movie is in both
#csv_sort = tags.sort_values(by=['movieId'])
#test = csv_sort['movieId'].isin(movies['movieId'])
#t = csv_sort[test]

# Movie ID from movies.csv, Tag Name from tags.csv
for t_row in tag_df.itertuples():
    tt = [t_row.tag, t_row.movieId]
    tagsTable.append(tt)

# Fake User Data Creation
# Converts baby-names.csv and surnames.csv DataFrames to Lists
first = fName_df['name'].tolist()
last = lName_df['name'].tolist()

# Creates user data tuples using the lists
for i in range(1, 611):  # 610 entries since ratings.csv has 610 different userID's (this is only for fake data)
    first_name = str(random.choice(first))
    last_name = str(random.choice(last)).lower().title()
    email = first_name.lower() + last_name.lower() + "@s.r.e"
    ut = [first_name, last_name, email, 1]
    userTable.append(ut)

# Connection to Database
d_con = connection.MySQLConnection(user='fp_user', password='flickpick123',
                                   host='ec2-18-222-97-98.us-east-2.compute.amazonaws.com', database='FlickPick')
cursor = d_con.cursor()

# Batch query executions per table using tuple lists
#cursor.executemany("INSERT INTO movies (id, name) VALUES (%s, %s)", movieTable)
#cursor.executemany("INSERT INTO genre (movie_id, genre) VALUES (%s, %s)", genreTable)
#cursor.executemany("INSERT INTO users (firstName, lastName, email, isAdmin) VALUES (%s, %s, %s, %s)", userTable)
#cursor.executemany("INSERT INTO tags (name, movie_id) VALUES (%s, %s)", tagsTable)
cursor.executemany("INSERT INTO movie_feedback (rating, movie_id, user_id) VALUES (%s, %s, %s)", movie_feedbackTable)
#cursor.execute("INSERT INTO tag_feedback (rating, movie_id, user_id, tag_id) "
#               "SELECT 5, movie_feedback.movie_id, movie_feedback.user_id, tags.id "
#               "FROM movie_feedback, tags WHERE movie_feedback.movie_id=tags.movie_id"
#               "AND movie_feedback.user_id=tags.user_id")

d_con.commit()
cursor.close()
d_con.close()

print(time.time() - start_time)
