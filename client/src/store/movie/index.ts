import { ApiRequest } from '../api';
import { Tag } from '../tag';

export const REQUEST_MOVIE_SEARCH_STARTED = 'REQUEST_MOVIE_SEARCH_STARTED';
export const RECEIVE_MOVIE_SEARCH_SUCCESS = 'RECEIVE_MOVIE_SEARCH_SUCCESS';
export const RECEIVE_MOVIE_SEARCH_FAILURE = 'RECEIVE_MOVIE_SEARCH_FAILURE';

export type REQUEST_MOVIE_SEARCH_STARTED = typeof REQUEST_MOVIE_SEARCH_STARTED;
export type RECEIVE_MOVIE_SEARCH_SUCCESS = typeof RECEIVE_MOVIE_SEARCH_SUCCESS;
export type RECEIVE_MOVIE_SEARCH_FAILURE = typeof RECEIVE_MOVIE_SEARCH_FAILURE;

export type MOVIE_SEARCH_TYPES =
    | REQUEST_MOVIE_SEARCH_STARTED
    | RECEIVE_MOVIE_SEARCH_SUCCESS
    | RECEIVE_MOVIE_SEARCH_FAILURE;

export interface Movie {
    id: number;
    title: string;
    genres: Record<number, string>;
    rating: number;
    tags: Record<number, Tag>;
}

export interface SearchMovieStarted extends ApiRequest {
    type: REQUEST_MOVIE_SEARCH_STARTED;
    title: string;
}

export interface SearchMovieSuccess extends ApiRequest {
    type: RECEIVE_MOVIE_SEARCH_SUCCESS;
    response: {
        entities: {
            movies?: Record<number, Movie>;
        };
    };
}
export interface SearchMovieFailure extends ApiRequest {
    type: RECEIVE_MOVIE_SEARCH_FAILURE;
}

export type SearchMovieActions = SearchMovieStarted | SearchMovieSuccess | SearchMovieFailure;

export const GET_MOVIE = 'GET_MOVIE';

export interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}
