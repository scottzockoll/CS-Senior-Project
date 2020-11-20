import { AppAction } from '../../store';
import { TOGGLE_INITIAL_SURVEY_MODAL } from '../../store/common';

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.show;
        default:
            return state;
    }
}
