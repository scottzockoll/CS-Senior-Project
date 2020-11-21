/* eslint-disable @typescript-eslint/no-redeclare */

export const TOGGLE_INITIAL_SURVEY_MODAL = 'TOGGLE_INITIAL_SURVEY_MODAL';
export type TOGGLE_INITIAL_SURVEY_MODAL = typeof TOGGLE_INITIAL_SURVEY_MODAL;

export interface ToggleInitialSurveyModal {
    type: TOGGLE_INITIAL_SURVEY_MODAL;
    show: boolean;
}
