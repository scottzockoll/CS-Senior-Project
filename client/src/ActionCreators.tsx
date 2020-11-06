import { GET_USER, GET_USERS, GET_MOVIE, GET_RECOMMENDATIONS, ActionTypes, SEARCH_MOVIE } from './Types';

// Actions are object literals that contain a type field specifying the action.
// The literal also contains any data needed to make the change to the store.

// Action creators are functions that return an object literal.

export function getUser(userId: number): ActionTypes {
    return {
        type: GET_USER,
        userId: userId,
    };
}

export function getUsers(idOffset: number, limit: number): ActionTypes {
    return {
        type: GET_USERS,
        idOffset: idOffset,
        limit: limit,
    };
}

export function getMovie(movieId: number): ActionTypes {
    return {
        type: GET_MOVIE,
        movieId: movieId,
    };
}

export function getRecommendations(userId: number): ActionTypes {
    return {
        type: GET_RECOMMENDATIONS,
        userId: userId,
    };
}

export function searchMovie(movieTitle: string): ActionTypes {
    return {
        type: SEARCH_MOVIE,
        title: movieTitle,
    };
}
