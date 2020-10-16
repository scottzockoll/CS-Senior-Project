from server import app
from flask_sqlalchemy import SQLAlchemy


# User = fp_user
# Password = flickpick123
# Server = ec2-18-222-97-98.us-east-2.compute.amazonaws.com
# Database Name = FlickPick

app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql://fp_user:flickpick123@ec2-18-222-97-98.us-east-2.compute.amazonaws.com/FlickPick'
db = SQLAlchemy(app)

engine = db.engine
connection = engine.connect()

# Test Queries

# insert = connection.execute("INSERT INTO movies (id, name) values ('1', 'Testing')")

# result = connection.execute("SELECT name FROM movies")
# for row in result:
#       print("name:", row['name'])

# delete = connection.execute("DELETE FROM movies WHERE id = 1")
