import { AppAction, TOGGLE_INITIAL_SURVEY_MODAL, TOGGLE_MOVIE_MODAL } from '../../store';

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.shouldBeVisible;
        default:
            return state;
    }
}

export function toggleMovieModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_MOVIE_MODAL:
            return action.shouldBeVisible;
        default:
            return state;
    }
}
