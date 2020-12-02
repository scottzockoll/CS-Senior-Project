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

export function getUserMoviesReducer(state = intialMoviesState, action: AppAction): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            if (action.response.entities.movies) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.movies).map((movie) => movie.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.movies,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USER_FAILURE:
        case RECEIVE_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}

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
