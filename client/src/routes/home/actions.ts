import { AppAction, TOGGLE_INITIAL_SURVEY_MODAL } from '../../store';

export function toggleInitialSurveyModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_INITIAL_SURVEY_MODAL,
        shouldBeVisible: shouldBeVisible,
    };
}
