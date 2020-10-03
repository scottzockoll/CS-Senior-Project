from server import app

# --User--

# Returns a single user by user id.
@app.route('/api/v1/user/<int:id>', methods=['GET'])
def get_user(id: int):
  return {
    "id": id,
    "email": "example@example.com",
    "firstName": "Joe",
    "lastName": "Smith",
    "isAdmin": true
  }

# Delete a user by user id.
@app.route('/api/v1/user/<int:id>', methods=['DELETE'])
def del_user(id: int):
  return {
    "id": id,
    "result": "OK"
  }

# Partially update a user by user id.
@app.route('/api/v1/user/<int:id>', methods=['PATCH'])
def update_user(id: int):
  return {
    "id": id,
    "result": "OK"
  }

# Create a new user.
@app.route('/api/v1/user', methods=['POST'])
def create_user():
  return {
    "id": 999,
    "result": "Created"
  }

# --Movie--

# Return a movie, its genres, and its tags.
@app.route('/api/v1/movie/<int:id>', methods=['GET'])
def get_movie(id: int):
  return {
    "movie_id": id,
    "movie_name": "Terminator",
    "genres": ["Action", "Science Fiction"]
  }

# Get a list of auto-complete suggestions for a partial movie title.
@app.route('/api/v1/movie/search/<string:name>', methods=['GET'])
def get_movie_autocomplete(name: string):
  return {
    "movies": [{
      "id": 11,
      "title": "Terminator II: Judgment Day"
    },
    {
      "id": 22,
      "title": "The Truman Show"
    },
    {
      "id": 33,
      "title": "The Terminal"
    }]
  }

# --Tag--

# Return a tag by id.
@app.route('/api/v1/tag/<int:id>', methods=['GET'])
def get_tag(id: int):
  return {
    "id": id,
    "name": "Science Fiction",
    "movie_id": 999
  }

# Get a list of auto-complete suggestions for a partial tag. The same tag may exist across multiple movies, this method does not return every instance of a tag, only unique tags.
@app.route('/api/v1/tag/search/<string:name>/<int:movieId>', methods=['GET'])
def get_tag_autocomplete(name: string, movieId: int):
  return {
    "tags": [{
      "name": "Action"
    },
    {
      "name": "Science Fiction"
    },
    {
      "name": "Comedy"
    }]
  }

# --Feedback--

# Return the user’s feedback of the specified movie id.
@app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['GET'])
def get_feedback(userId: int, movieId: int):
  return {
    "id": 999,
    "request": "OK"
  }

# Return the user’s feedback on tags of a specific movie.
@app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>', methods=['GET'])
def get_feedback_tags(userId: int, movieId: int):
  return {
    "feedbacks": [{
      "id": 111,
      "tag_id": 222,
      "rating": 3.5
    },
    {
      "id": 333,
      "tag_id": 444,
      "rating": 1.0
    },
    {
      "id": 555,
      "tag_id": 666,
      "rating": 4.5
    }]
  }

# Replace a user's feedback of a specific movie.
@app.route('/api/v1/feedback/movie/<int:feedbackId>', methods=['PUT'])
def update_feedback(feedbackId: int):
  return {
    "id": feedbackId,
    "request": "OK"
  }

# Replace the feedback for a specific tag id.
@app.route('/api/v1/feedback/tags/<int:feedbackId>', methods=['PUT'])
def update_feedback_tag(feedbackId: int):
  return {
    "id": feedbackId,
    "request": "OK"
  }

# Create a new feedback row for a movie from a user.
@app.route('/api/v1/feedback/movie/<int:userId>/<int:movieId>', methods=['POST'])
def create_feedback():
  return {
    "id": movieId,
    "result": "Created"
  }

# Creates a new tag feedback for a specific movie and user
@app.route('/api/v1/feedback/tags/<int:userId>/<int:movieId>/<int:tagId>', methods=['POST'])
def create_feedback_tag():
  return {
    "id": tagId,
    "result": "Created"
  }

# --Recommendation--

# Get the top 10 recommendations for a specified user.
@app.route('/api/v1/recommendation/<int:userId>', methods=['GET'])
def get_recommendations(userId: int):
  return {
    "movies": [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
  }
