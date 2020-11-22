import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { combineReducers } from 'redux';
import { UserEntitiesActions, UsersEntitiesTypes } from './user';
import {
    deleteUserReducer,
    tokenReducer,
    userAuthReducer,
    usersMoviesReducer,
    usersReducer,
    usersTagsReducer,
} from './user/reducers';
import { MovieDeleteActions, MovieDeleteEntitiesTypes, MovieEntitiesActions, MovieUpdateEntitiesTypes } from './movie';
import { deleteMoviesReducer } from './movie/reducers';
import { toggleInitialSurveyModalReducer } from './home/reducers';
import { TOGGLE_INITIAL_SURVEY_MODAL, ToggleInitialSurveyModal } from './home';

export type AppAction = UserEntitiesActions | ToggleInitialSurveyModal | MovieEntitiesActions | MovieDeleteActions;

export type ActionType =
    | UsersEntitiesTypes
    | MovieUpdateEntitiesTypes
    | MovieDeleteEntitiesTypes
    | TOGGLE_INITIAL_SURVEY_MODAL;

/**
 * Alias for app-specific redux store dispatch function.
 */
export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
/**
 * Alias for app-specific thunk type.
 */
export type AppThunk = ThunkAction<void, RootState, unknown, AppAction>;

export enum AsyncActionStatus {
    Request = '@@REQUEST',
    Success = '@@SUCCESS',
    Failure = '@@FAILURE',
}

// The store needs to be passed a single reducer. We can create this by calling combineReducers
export const rootReducer = combineReducers({
    activeUser: userAuthReducer,
    users: usersReducer,
    movies: usersMoviesReducer,
    tags: usersTagsReducer,
    token: tokenReducer,
    initialSurveyVisible: toggleInitialSurveyModalReducer,
    deleteUser: deleteUserReducer,
    deleteMovies: deleteMoviesReducer,
    googleClientId: () => '962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com',
});

/**
 * Root of state object, contains typing for the entire state tree.
 */
export type RootState = ReturnType<typeof rootReducer>;
