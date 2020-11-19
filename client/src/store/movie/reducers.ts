import { AppAction } from '../index';
import { Paginated } from '../types';
import {
    Movie,
    RECEIVE_MOVIE_SEARCH_FAILURE,
    RECEIVE_MOVIE_SEARCH_SUCCESS,
    REQUEST_MOVIE_SEARCH_STARTED,
} from './index';

const initialSearchMovieStates: Paginated<Movie> = {
    ids: [],
    entities: {},
    pages: [],
    prevPage: '',
    nextPage: '',
    isFetching: false,
};

export function movieSearchReducer(state = initialSearchMovieStates, action: AppAction): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_MOVIE_SEARCH_STARTED:
            return state;
        case RECEIVE_MOVIE_SEARCH_SUCCESS:
            return state;
        case RECEIVE_MOVIE_SEARCH_FAILURE:
            return state;
        default:
            return state;
    }
}
