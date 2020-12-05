import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL } from './index';
import { TOGGLE_MOVIE_MODAL } from '../movie';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        show: shouldBeVisible,
    };
}

export function toggleMovieModal(shouldBeVisible: boolean, movieId?: number): AppAction {
    return {
        type: TOGGLE_MOVIE_MODAL,
        visible: shouldBeVisible,
        movieId,
    };
}
