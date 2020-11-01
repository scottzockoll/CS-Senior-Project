import { GET_USER, RECEIVE_USER, GET_MOVIE, GET_RECOMMENDATIONS, ActionTypes } from './Types';
import fetch from 'cross-fetch';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppThunk } from './store';

// Actions are object literals that contain a type field specifying the action.
// The literal also contains any data needed to make the change to the store.

// Action creators are functions that return an object literal.

export function getUser(userId: number): ActionTypes {
    return {
        type: GET_USER,
        userId: userId,
    };
}

export function receiveUser(userId: number, json: object): ActionTypes {
    return {
        type: RECEIVE_USER,
        userId: userId,
        userData: json,
    };
}

export function fetchUser(userId: number): AppThunk {
    return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        dispatch(getUser(userId));
        return fetch('http://127.0.0.1:5000/api/v1/user/1')
            .then((response) => response.json())
            .then((json) => dispatch(receiveUser(userId, json)));
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
