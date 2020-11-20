import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL } from './index';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        show: shouldBeVisible,
    };
}
