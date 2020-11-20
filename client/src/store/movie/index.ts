import { Tag } from '../tag';
import { ApiRequest } from '../api';

export interface Movie {
    id: number;
    title: string;
    genres: Record<number, string>;
    rating: number;
    tags: Record<number, Tag>;
}

export const REQUEST_MOVIE_STARTED = 'REQUEST_MOVIE_STARTED';
export const RECEIVE_MOVIE_SUCCESS = 'RECEIVE_MOVIE_SUCCESS';
export const RECEIVE_MOVIE_FAILURE = 'RECEIVE_MOVIE_FAILURE';

export type REQUEST_MOVIE_STARTED = typeof REQUEST_MOVIE_STARTED;
export type RECEIVE_MOVIE_SUCCESS = typeof RECEIVE_MOVIE_SUCCESS;
export type RECEIVE_MOVIE_FAILURE = typeof RECEIVE_MOVIE_FAILURE;

export const UPDATE_MOVIE_RATING_STARTED = 'UPDATE_MOVIE_RATING_STARTED';
export const UPDATE_MOVIE_RATING_SUCCESS = 'UPDATE_MOVIE_RATING_SUCCESS';
export const UPDATE_MOVIE_RATING_FAILURE = 'UPDATE_MOVIE_RATING_FAILURE';

export type UPDATE_MOVIE_RATING_STARTED = typeof UPDATE_MOVIE_RATING_STARTED;
export type UPDATE_MOVIE_RATING_SUCCESS = typeof UPDATE_MOVIE_RATING_SUCCESS;
export type UPDATE_MOVIE_RATING_FAILURE = typeof UPDATE_MOVIE_RATING_FAILURE;

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

export const GET_MOVIE = 'GET_MOVIE';

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

/**
 * Any movie entities action, that is a movie entities Request {Start, Success, Failure}
 */
export type MovieEntitiesActions = UpdateMovieRatingStarted | UpdateMovieRatingSuccess | UpdateMovieRatingFailure;
export type MovieDeleteActions = DeleteMoviesStarted | DeleteMoviesSuccess | DeleteMoviesFailure;
