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

// export function updateMovieRatingReducer(state = [], action: MovieEntitiesActions): string {
//     switch (action.type) {
//         case UPDATE_MOVIE_RATING_STARTED:
//             return action.rating;
//         case UPDATE_MOVIE_RATING_SUCCESS:
//             return action
//         default:
//             return "";
//     }
// }

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
