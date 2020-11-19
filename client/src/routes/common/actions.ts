import { AppAction, AsyncActionStatus } from '../../store';
import { CALL_API } from '../../store/api';
import {
    RECEIVE_MOVIE_SEARCH_FAILURE,
    RECEIVE_MOVIE_SEARCH_SUCCESS,
    REQUEST_MOVIE_SEARCH_STARTED,
} from '../../store/movie';
import { SCHEMAS } from '../../store/schema';

export function searchMovie(movieTitle: string): AppAction {
    return {
        type: REQUEST_MOVIE_SEARCH_STARTED,
        title: movieTitle,
        [CALL_API]: {
            endpoint: `movie/search/${movieTitle}`,
            schema: SCHEMAS['MOVIE_ARRAY'],
            method: 'GET',
            body: {},
            types: {
                [AsyncActionStatus.Request]: REQUEST_MOVIE_SEARCH_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_MOVIE_SEARCH_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_MOVIE_SEARCH_FAILURE,
            },
        },
    };
}
