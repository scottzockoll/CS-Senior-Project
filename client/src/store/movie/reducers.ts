import {
    DELETE_MOVIES_FAILURE,
    DELETE_MOVIES_STARTED,
    DELETE_MOVIES_SUCCESS,
    Movie,
    MovieDeleteActions,
} from './index';
import { AppAction } from '../index';
import { Paginated } from '../types';
import {
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_USER_STARTED,
    REQUEST_USERS_STARTED,
} from '../user';

const intialMoviesState: Paginated<Movie> = {
    entities: {},
    ids: [],
    isFetching: false,
};

export function deleteMoviesReducer(state = -1, action: MovieDeleteActions): number {
    switch (action.type) {
        case DELETE_MOVIES_STARTED:
            return action.id;
        case DELETE_MOVIES_SUCCESS:
            return action.id;
        case DELETE_MOVIES_FAILURE:
            return action.id;
        default:
            return state;
    }
}
