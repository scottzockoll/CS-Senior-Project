import {
    CREATE_MOVIE_RATING_STARTED,
    CreateMovieRatingStarted,
    DELETE_MOVIES_FAILURE,
    DELETE_MOVIES_STARTED,
    DELETE_MOVIES_SUCCESS,
    DeleteMoviesStarted,
    RECEIVE_MOVIE_FAILURE,
    RECEIVE_MOVIE_SUCCESS,
    REQUEST_MOVIE_STARTED,
    RequestMovieStarted,
    UPDATE_MOVIE_RATING_FAILURE,
    UPDATE_MOVIE_RATING_STARTED,
    UPDATE_MOVIE_RATING_SUCCESS,
    UpdateMovieRatingStarted,
} from './index';
import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';

export function requestMovie(id: number): RequestMovieStarted {
    return {
        id,
        type: 'REQUEST_MOVIE_STARTED',
        [CALL_API]: {
            body: {},
            endpoint: `movie/${id}`,
            method: 'GET',
            schema: SCHEMAS['MOVIE'],
            types: {
                [AsyncActionStatus.Request]: REQUEST_MOVIE_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_MOVIE_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_MOVIE_FAILURE,
            },
        },
    };
}

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

export function createMovieRating(userId: number, movieId: number, rating: number): CreateMovieRatingStarted {
    return {
        userId,
        movieId,
        rating,
        type: CREATE_MOVIE_RATING_STARTED,
        [CALL_API]: {
            endpoint: `feedback/movie/${userId}/${movieId}`,
            schema: SCHEMAS['NULL'],
            method: 'POST',
            body: {
                rating: rating,
            },
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
