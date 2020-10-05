import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs
import random
from typing import Dict, Text, Tuple


class FlickPickModel(tfrs.Model):

    def __init__(self, user_model, item_model, task: tfrs.tasks.Retrieval):
        super().__init__()

        # Set up user and movie representations.
        self.user_model = user_model
        self.item_model = item_model

        # Set up a retrieval task.
        self.task = task

    def compute_loss(
            self, features: Dict[Text, tf.Tensor], training=False) -> tf.Tensor:
        # Define how the loss is computed.

        user_embeddings = self.user_model(features["user_id"])
        movie_embeddings = self.item_model(features["movie_id"])

        return self.task(user_embeddings, movie_embeddings)


def load_dataset(data_dir: str) -> Tuple[tf.data.Dataset, tf.data.Dataset]:
    """
    Load and map the dataset
    :param data_dir: The directory to load datasets from
    :return: (ratings, movies)
    """
    ratings: tf.data.Dataset = tfds.load('movie_lens/25m-ratings', data_dir=data_dir, split="train")
    movies: tf.data.Dataset = tfds.load('movie_lens/25m-movies', data_dir=data_dir, split="train")

    ratings = ratings.map(lambda x: {
        "movie_id": float(x["movie_id"]),
        "user_id": float(x["user_id"])
    })
    movies = movies.map(lambda x: float(x["movie_id"]))

    return ratings, movies


def construct_model(movies: tf.data.Dataset) -> tfrs.Model:
    user_model = tf.keras.layers.Embedding(input_dim=250_000, output_dim=64)
    item_model = tf.keras.layers.Embedding(input_dim=250_000, output_dim=64)
    task = tfrs.tasks.Retrieval(
        metrics=tfrs.metrics.FactorizedTopK(
            candidates=movies.batch(128).map(item_model)
        )
    )
    model = FlickPickModel(user_model, item_model, task)
    model.compile(optimizer=tf.keras.optimizers.Adam(0.025))

    return model


def run(**kwargs):
    seed = kwargs['seed']
    if seed is None:
        seed = int(random.random() * 2 ** 31)

    epochs = kwargs['epochs']
    data_dir = kwargs['data_dir']

    print('-' * 50)
    print("Using seed %d" % seed)
    print("Training for %d epochs" % epochs)
    print('-' * 50)

    ratings, movies = load_dataset(data_dir)
    model = construct_model(movies)

    tf.random.set_seed(seed)

    current = 0
    train_size = 2 ** 14
    test_size = 2 ** 12
    save_every = 4

    while current < epochs:
        train = ratings.skip(train_size * current).skip(test_size * current).take(train_size)
        test = ratings.skip(train_size * current).skip(test_size * current).skip(train_size).take(test_size)

        model.fit(train.batch(train_size // 16), epochs=1)

        if (current % save_every) == 0:
            model.save_weights(
                'checkpoints/epoch %d/flick_pick_weights' %
                current)

        print(model.evaluate(test.batch(test_size), return_dict=True))

        current += 1
