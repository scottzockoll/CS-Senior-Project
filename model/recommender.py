import random
from datetime import datetime, timedelta
from typing import Dict, Text, Tuple

import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs

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


def load_weights(model: tfrs.Model):
    model.load_weights('E:\\CS-Senior-Project\\server\\model\\weights\\checkpoint')


class CheckpointCallback(tf.keras.callbacks.Callback):

    def __init__(self, checkpoint_manager: tf.train.CheckpointManager, checkpoint_every: timedelta):
        super(CheckpointCallback, self).__init__()

        self.checkpoint_delta = checkpoint_every
        self.last_checkpoint = datetime.now()
        self.checkpoint_manager = checkpoint_manager

    def on_train_batch_end(self, batch, logs=None):
        if datetime.now() > self.last_checkpoint + self.checkpoint_delta:
            self.last_checkpoint = datetime.now()
            self.checkpoint_manager.save()



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
    ratings = ratings.shuffle(1_000_000, seed=seed, reshuffle_each_iteration=False)

    model = construct_model(movies)

    tf.random.set_seed(seed)

    train_size = 24_000_000
    test_size = 1_000_000

    checkpoint = tf.train.Checkpoint(optimizer=model.optimizer, model=model)
    checkpoint_manager = tf.train.CheckpointManager(checkpoint, directory="/model/checkpoints", max_to_keep=5)
    checkpoint_callback = CheckpointCallback(checkpoint_manager, timedelta(minutes=30))

    train = ratings.take(train_size)
    test = ratings.skip(train_size).take(test_size)

    model.fit(train.batch(4096), epochs=5, callbacks=[checkpoint_callback])

    print(model.evaluate(test.batch(test_size), return_dict=True))
