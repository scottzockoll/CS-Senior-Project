import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL, UPDATE_SURVEY } from './index';
import { TOGGLE_MOVIE_MODAL } from '../movie';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        show: shouldBeVisible,
    };
}

export function updateSurvey(index: number, movieId: number, title: string, rating: number): AppAction {
    return {
        type: UPDATE_SURVEY,
        index,
        movieId,
        title,
        rating,
    };
}

export function toggleMovieModal(shouldBeVisible: boolean, movieId?: number): AppAction {
    return {
        type: TOGGLE_MOVIE_MODAL,
        visible: shouldBeVisible,
        movieId,
    };
}
