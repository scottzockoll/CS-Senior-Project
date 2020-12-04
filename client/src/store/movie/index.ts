import { ApiRequest } from '../api';
import { Tag } from '../tag';

/**
 * A single movie.
 */
export interface Movie {
    id: number;
    title: string;
    genres: string[];
    rating: number;
    tags: Record<number, Tag>;
}

export interface Rating {
    user_id: number;
    rating: number;
    movie_id: number;
}

/**
 * Update Movie Rating
 */

export const UPDATE_MOVIE_RATING_STARTED = 'UPDATE_MOVIE_RATING_STARTED';
export const UPDATE_MOVIE_RATING_SUCCESS = 'UPDATE_MOVIE_RATING_SUCCESS';
export const UPDATE_MOVIE_RATING_FAILURE = 'UPDATE_MOVIE_RATING_FAILURE';

export type UPDATE_MOVIE_RATING_STARTED = typeof UPDATE_MOVIE_RATING_STARTED;
export type UPDATE_MOVIE_RATING_SUCCESS = typeof UPDATE_MOVIE_RATING_SUCCESS;
export type UPDATE_MOVIE_RATING_FAILURE = typeof UPDATE_MOVIE_RATING_FAILURE;

export interface UpdateMovieRatingStarted extends ApiRequest {
    type: UPDATE_MOVIE_RATING_STARTED;
    feedbackId: number;
    rating: number;
}

export interface UpdateMovieRatingSuccess {
    type: UPDATE_MOVIE_RATING_SUCCESS;
}

export interface UpdateMovieRatingFailure {
    type: UPDATE_MOVIE_RATING_FAILURE;
}

export type MovieEntitiesActions = UpdateMovieRatingStarted | UpdateMovieRatingSuccess | UpdateMovieRatingFailure;

/**
 * Delete Movie
 */

export const DELETE_MOVIES_STARTED = 'DELETE_MOVIES_STARTED';
export const DELETE_MOVIES_SUCCESS = 'DELETE_MOVIES_SUCCESS';
export const DELETE_MOVIES_FAILURE = 'DELETE_MOVIES_FAILURE';

export type DELETE_MOVIES_STARTED = typeof DELETE_MOVIES_STARTED;
export type DELETE_MOVIES_SUCCESS = typeof DELETE_MOVIES_SUCCESS;
export type DELETE_MOVIES_FAILURE = typeof DELETE_MOVIES_FAILURE;

export type MovieUpdateEntitiesTypes =
    | UPDATE_MOVIE_RATING_STARTED
    | UPDATE_MOVIE_RATING_SUCCESS
    | UPDATE_MOVIE_RATING_FAILURE;

export type MovieDeleteEntitiesTypes = DELETE_MOVIES_STARTED | DELETE_MOVIES_SUCCESS | DELETE_MOVIES_FAILURE;

export interface DeleteMoviesStarted extends ApiRequest {
    type: DELETE_MOVIES_STARTED;
    id: number;
}

export interface DeleteMoviesSuccess {
    type: DELETE_MOVIES_SUCCESS;
    id: number;
}

export interface DeleteMoviesFailure {
    type: DELETE_MOVIES_FAILURE;
    id: number;
}

export type MovieDeleteActions = DeleteMoviesStarted | DeleteMoviesSuccess | DeleteMoviesFailure;

export const TOGGLE_MOVIE_MODAL = 'TOGGLE_MOVIE_MODAL';
export type TOGGLE_MOVIE_MODAL = typeof TOGGLE_MOVIE_MODAL;
export interface ToggleMovieModal {
    type: TOGGLE_MOVIE_MODAL;
    visible: boolean;
    movieId?: number;
}

// TODO: We'll need an action that sends an API request to the server which gets the recommendations
//  It will also need some type information, an interface, and a reducer.
