import {
    GET_MOVIE,
    GetMovieAction,
    REQUEST_MOVIE_STARTED,
    RECEIVE_MOVIE_SUCCESS,
    RECEIVE_MOVIE_FAILURE,
} from './index';
import { CALL_API } from '../api';
import { AsyncActionStatus } from '../index';
import { SCHEMAS } from '../schema';

export function getMovie(id: number) {
    return {
        type: GET_MOVIE,
        id,
        [CALL_API]: {
            endpoint: `movie/${id}`,
            //wrong
            schema: SCHEMAS['USER_ARRAY'],
            types: {
                [AsyncActionStatus.Request]: REQUEST_MOVIE_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_MOVIE_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_MOVIE_FAILURE,
            },
        },
    };
}

/*
export function getUser(id: number) {
    return {
        type: GET_USER,
        id
    }
}
*/
