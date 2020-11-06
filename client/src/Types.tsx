export interface Movie {
    movieId: number;
    movieName: string;
    genres: Array<string>;
}

export interface RatedMovie extends Movie {
    userRating: number;
}

export interface Tag {
    id: number;
    name: string;
    movieId: number;
}

export interface User {
    userId: number;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    watchedMovies: Record<number, RatedMovie>;
    tags: Record<number, Tag>;
}

export interface Recommendations {
    movieIds: Array<number>;
}

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

export interface GetUserAction {
    type: typeof GET_USER;
    userId: number;
}

export interface GetUsersAction {
    type: typeof GET_USERS;
    idOffset: number;
    limit: number;
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
export type ActionTypes = GetUserAction | GetUsersAction | GetMovieAction | GetRecommendationAction;
