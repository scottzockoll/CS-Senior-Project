import { GET_USER, GET_MOVIE, GET_RECOMMENDATIONS, ActionTypes } from './Types';

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
