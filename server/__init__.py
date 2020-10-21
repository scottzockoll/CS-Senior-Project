from server.routes.api import register_api_routes
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

register_api_routes(app)
