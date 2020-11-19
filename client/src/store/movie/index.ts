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

export type MovieUpdateEntitiesTypes =
    | UPDATE_MOVIE_RATING_STARTED
    | UPDATE_MOVIE_RATING_SUCCESS
    | UPDATE_MOVIE_RATING_FAILURE;

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

/**
 * Any movie entities action, that is a movie entities Request {Start, Success, Failure}
 */
export type MovieEntitiesActions = UpdateMovieRatingStarted | UpdateMovieRatingSuccess | UpdateMovieRatingFailure;
