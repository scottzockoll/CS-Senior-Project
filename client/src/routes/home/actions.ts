import { AppAction, TOGGLE_INITIAL_SURVEY_MODAL, TOGGLE_MOVIE_MODAL } from '../../store';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        shouldBeVisible: shouldBeVisible,
    };
}

export function toggleMovieModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_MOVIE_MODAL,
        shouldBeVisible: shouldBeVisible,
    };
}
