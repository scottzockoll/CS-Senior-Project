import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL } from './index';

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.show;
        default:
            return state;
    }
}
