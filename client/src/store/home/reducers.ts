import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL } from './index';
import { TOGGLE_MOVIE_MODAL } from '../movie';

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.show;
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
