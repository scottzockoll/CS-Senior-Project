import {
    UPDATE_MOVIE_RATING_FAILURE,
    UPDATE_MOVIE_RATING_STARTED,
    UPDATE_MOVIE_RATING_SUCCESS,
    UpdateMovieRatingStarted,
    DELETE_MOVIES_FAILURE,
    DELETE_MOVIES_STARTED,
    DELETE_MOVIES_SUCCESS,
    DeleteMoviesStarted,
} from './index';
import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';

export function updateMovieRating(feedbackId: number, rating: number): UpdateMovieRatingStarted {
    return {
        feedbackId,
        rating,
        type: UPDATE_MOVIE_RATING_STARTED,
        [CALL_API]: {
            endpoint: `feedback/movie/${feedbackId}/${rating}`,
            schema: SCHEMAS['NULL'],
            method: 'PUT',
            body: {},
            types: {
                [AsyncActionStatus.Request]: UPDATE_MOVIE_RATING_STARTED,
                [AsyncActionStatus.Success]: UPDATE_MOVIE_RATING_SUCCESS,
                [AsyncActionStatus.Failure]: UPDATE_MOVIE_RATING_FAILURE,
            },
        },
    };
}

export function deleteMovies(id: number): DeleteMoviesStarted {
    return {
        id,
        type: DELETE_MOVIES_STARTED,
        [CALL_API]: {
            endpoint: `feedback/${id}`,
            method: 'DELETE',
            schema: SCHEMAS['NULL'],
            body: {},
            types: {
                [AsyncActionStatus.Request]: DELETE_MOVIES_STARTED,
                [AsyncActionStatus.Success]: DELETE_MOVIES_SUCCESS,
                [AsyncActionStatus.Failure]: DELETE_MOVIES_FAILURE,
            },
        },
    };
}
