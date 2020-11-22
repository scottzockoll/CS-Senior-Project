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
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_MOVIE_SEARCH_SUCCESS:
            return {
                ...state,
                ids:
                    Object.values(action.response.entities).length != 0
                        ? // TODO
                          // @ts-ignore
                          [...Object.values(action.response.entities.movies).map((movie) => movie.id)]
                        : [],
                entities: {
                    ...action.response.entities.movies,
                },
                nextPage: state.nextPage, // TODO
                prevPage: state.prevPage, // TODO
                isFetching: false,
            };
        case RECEIVE_MOVIE_SEARCH_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
