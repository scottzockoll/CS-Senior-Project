import { DELETE_MOVIES_FAILURE, DELETE_MOVIES_STARTED, DELETE_MOVIES_SUCCESS, MovieDeleteActions } from './index';

export function deleteMoviesReducer(state = -1, action: MovieDeleteActions): number {
    switch (action.type) {
        case DELETE_MOVIES_STARTED:
            return action.id;
        case DELETE_MOVIES_SUCCESS:
            return action.id;
        case DELETE_MOVIES_FAILURE:
            return action.id;
        default:
            return state;
    }
}
