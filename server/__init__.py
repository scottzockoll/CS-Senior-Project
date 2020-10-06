from server.routes.api import register_api_routes, register_recommendations_routes
from flask import Flask
from server.model.recommender import construct_model, load_dataset, load_weights
app = Flask(__name__)

_, movies = load_dataset(data_dir='dataset')
model = construct_model(movies)
load_weights(model)

register_api_routes(app)
register_recommendations_routes(app, model)
