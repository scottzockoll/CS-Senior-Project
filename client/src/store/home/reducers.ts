import { AppAction } from '../index';
import { TOGGLE_INITIAL_SURVEY_MODAL } from './index';
import { TOGGLE_MOVIE_MODAL, ToggleMovieModal } from '../movie';

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
