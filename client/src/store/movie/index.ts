export interface Movie {
    movieId: number;
    movieName: string;
    genres: Array<string>;
}
export const REQUEST_MOVIE_STARTED = 'REQUEST_MOVIE_STARTED';
export const RECEIVE_MOVIE_SUCCESS = 'RECEIVE_MOVIE_SUCCESS';
export const RECEIVE_MOVIE_FAILURE = 'RECEIVE_MOVIE_FAILURE';

export type REQUEST_MOVIE_STARTED = typeof REQUEST_MOVIE_STARTED;
export type RECEIVE_MOVIE_SUCCESS = typeof RECEIVE_MOVIE_SUCCESS;
export type RECEIVE_MOVIE_FAILURE = typeof RECEIVE_MOVIE_FAILURE;

export const GET_MOVIE = 'GET_MOVIE';

export interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}

export type GetActions = GetMovieAction;
