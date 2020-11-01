export interface Movie {
    movieId: number;
    movieName: string;
    genres: Array<string>;
}

export interface Tag {
    id: number;
    name: string;
    movieId: number;
}

export interface User {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    movies: Record<number, Movie>;
    tags: Record<number, Tag>;
    isFetching: boolean;
}

export interface Recommendations {
    movieIds: Array<number>;
}

export const GET_USER = 'GET_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

export interface GetUserAction {
    type: typeof GET_USER;
    userId: number;
}

export interface ReceiveUserAction {
    type: typeof RECEIVE_USER;
    userId: number;
    userData: object;
}

export interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}

export interface GetRecommendationAction {
    type: typeof GET_RECOMMENDATIONS;
    userId: number;
}

// The "|" operator is a union. This means ActionTypes can be any one of the
// types on the right hand side.
export type ActionTypes = GetUserAction | ReceiveUserAction | GetMovieAction | GetRecommendationAction;
