import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL, UPDATE_SURVEY } from './index';
import { TOGGLE_MOVIE_MODAL } from '../movie';

type SurveyType =
    | {
          movieId: number;
          title: string;
          rating: number;
      }
    | undefined;
const initialSurveyState: SurveyType[] = [];
export function surveyReducer(state = initialSurveyState, action: AppAction) {
    switch (action.type) {
        case UPDATE_SURVEY:
            let newState: SurveyType[] = [...state];
            if (action.index >= state.length) {
                newState = [...newState, ...new Array(action.index + 1 - state.length)];
            }
            newState[action.index] = {
                movieId: action.movieId,
                title: action.title,
                rating: action.rating,
            };
            return newState;
        default:
            return state;
    }
}

export function toggleInitialSurveyModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_INITIAL_SURVEY_MODAL:
            return action.show;
        default:
            return state;
    }
}

const initialToggleMovieModalState = {
    movieId: -1,
    visible: false,
};
export function toggleMovieModalReducer(state = initialToggleMovieModalState, action: AppAction) {
    switch (action.type) {
        case TOGGLE_MOVIE_MODAL:
            return {
                visible: action.visible,
                movieId: action.movieId ?? state.movieId,
            };
        default:
            return state;
    }
}
