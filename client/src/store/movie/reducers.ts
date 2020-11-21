import { AppAction } from '../index';
import { Paginated } from '../types';
import {
    Movie,
    RECEIVE_MOVIE_SEARCH_FAILURE,
    RECEIVE_MOVIE_SEARCH_SUCCESS,
    REQUEST_MOVIE_SEARCH_STARTED,
    MovieDeleteActions,
    DELETE_MOVIES_STARTED,
    DELETE_MOVIES_SUCCESS,
    DELETE_MOVIES_FAILURE,
} from './index';

const initialSearchMovieStates: Paginated<Movie> = {
    ids: [],
    entities: {},
    isFetching: false,
};

export function movieSearchReducer(state = initialSearchMovieStates, action: AppAction): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_MOVIE_SEARCH_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_MOVIE_SEARCH_SUCCESS:
            if (action.response.entities.movies) {
                return {
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
        case RECEIVE_MOVIE_SEARCH_FAILURE:
            return {
                ids: [],
                entities: {},
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
