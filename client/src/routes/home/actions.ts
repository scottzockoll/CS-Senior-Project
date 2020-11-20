import { AppAction } from '../../store';
import { TOGGLE_INITIAL_SURVEY_MODAL } from '../../store/common';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        show: shouldBeVisible,
    };
}
