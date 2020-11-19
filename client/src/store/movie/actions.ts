import {
    UPDATE_MOVIE_RATING_FAILURE,
    UPDATE_MOVIE_RATING_STARTED,
    UPDATE_MOVIE_RATING_SUCCESS,
    UpdateMovieRatingStarted,
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
            endpoint: `feedback/movie/${feedbackId}`,
            schema: SCHEMAS['NULL'],
            method: 'PUT',
            body: { rating: rating.toString() },
            types: {
                [AsyncActionStatus.Request]: UPDATE_MOVIE_RATING_STARTED,
                [AsyncActionStatus.Success]: UPDATE_MOVIE_RATING_SUCCESS,
                [AsyncActionStatus.Failure]: UPDATE_MOVIE_RATING_FAILURE,
            },
        },
    };
}
