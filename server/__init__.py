from server.routes.api import register_api_routes
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

register_api_routes(app)
# app.secret_key = "test"        # this is needed for cookies
