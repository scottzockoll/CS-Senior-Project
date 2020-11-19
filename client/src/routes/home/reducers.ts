import { AppAction, TOGGLE_INITIAL_SURVEY_MODAL } from '../../store';

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.shouldBeVisible;
        default:
            return state;
    }
}
