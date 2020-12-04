import { ApiRequest } from '../api';
import { Tag } from '../tag';
import { User } from '../user';

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

export const REQUEST_MOVIE_STARTED = 'REQUEST_MOVIE_STARTED';
export const RECEIVE_MOVIE_SUCCESS = 'RECEIVE_MOVIE_SUCCESS';
export const RECEIVE_MOVIE_FAILURE = 'RECEIVE_MOVIE_FAILURE';

export type REQUEST_MOVIE_STARTED = typeof REQUEST_MOVIE_STARTED;
export type RECEIVE_MOVIE_SUCCESS = typeof RECEIVE_MOVIE_SUCCESS;
export type RECEIVE_MOVIE_FAILURE = typeof RECEIVE_MOVIE_FAILURE;

export interface RequestMovieStarted extends ApiRequest {
    type: REQUEST_MOVIE_STARTED;
    id: number;
}

export interface ReceiveMovieSuccess {
    type: RECEIVE_MOVIE_SUCCESS;
    response: {
        entities: {
            movies?: Record<number, Movie>;
        };
    };
}

export interface ReceiveMovieFailure {
    type: RECEIVE_MOVIE_FAILURE;
}

export type RequestMovieAction = RequestMovieStarted | ReceiveMovieSuccess | ReceiveMovieFailure;

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

export const CREATE_MOVIE_RATING_STARTED = 'CREATE_MOVIE_RATING_STARTED';
export const CREATE_MOVIE_RATING_SUCCESS = 'CREATE_MOVIE_RATING_SUCCESS';
export const CREATE_MOVIE_RATING_FAILURE = 'CREATE_MOVIE_RATING_FAILURE';

export type CREATE_MOVIE_RATING_STARTED = typeof CREATE_MOVIE_RATING_STARTED;
export type CREATE_MOVIE_RATING_SUCCESS = typeof CREATE_MOVIE_RATING_SUCCESS;
export type CREATE_MOVIE_RATING_FAILURE = typeof CREATE_MOVIE_RATING_FAILURE;

export interface CreateMovieRatingStarted extends ApiRequest {
    type: CREATE_MOVIE_RATING_STARTED;
    userId: number;
    movieId: number;
    rating: number;
}

export interface CreateMovieRatingSuccess {
    type: CREATE_MOVIE_RATING_SUCCESS;
}

export interface CreateMovieRatingFailure {
    type: CREATE_MOVIE_RATING_FAILURE;
}

export type MovieEntitiesActions =
    | UpdateMovieRatingStarted
    | UpdateMovieRatingSuccess
    | UpdateMovieRatingFailure
    | CreateMovieRatingStarted
    | CreateMovieRatingSuccess
    | CreateMovieRatingFailure;

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
    | CREATE_MOVIE_RATING_STARTED
    | CREATE_MOVIE_RATING_SUCCESS
    | CREATE_MOVIE_RATING_FAILURE
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
