export const TOGGLE_INITIAL_SURVEY_MODAL = 'TOGGLE_INITIAL_SURVEY_MODAL';
export type TOGGLE_INITIAL_SURVEY_MODAL = typeof TOGGLE_INITIAL_SURVEY_MODAL;

export interface ToggleInitialSurveyModal {
    type: TOGGLE_INITIAL_SURVEY_MODAL;
    show: boolean;
}

export const UPDATE_SURVEY = 'UPDATE_SURVEY';
export type UPDATE_SURVEY = typeof UPDATE_SURVEY;

export interface UpdateSurveyAction {
    type: UPDATE_SURVEY;
    index: number;
    movieId: number;
    title: string;
    rating: number;
}
