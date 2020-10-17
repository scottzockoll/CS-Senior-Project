import { GET_USER, GET_MOVIE, GET_RECOMMENDATIONS, ActionTypes } from './Types';

// Actions are object literals that contain a type field specifying the action.
// The literal also contains any data needed to make the change to the store.

// Action creators are functions that return an object literal.

export function getUser(userId: number): ActionTypes {
    return {
        type: GET_USER,
        userId: userId,
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
