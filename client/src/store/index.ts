import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, combineReducers } from 'redux';
import { UserEntitiesActions, UsersEntitiesTypes } from './user';
import { userAuthReducer, usersReducer, tokenReducer } from './user/reducers';
import { toggleInitialSurveyModalReducer } from '../routes/home/reducers';
export type AppAction = UserEntitiesActions | ToggleInitialSurveyModal | SearchMovie;

export type ActionType = UsersEntitiesTypes | TOGGLE_INITIAL_SURVEY_MODAL | SEARCH_MOVIE;

export const TOGGLE_INITIAL_SURVEY_MODAL = 'TOGGLE_INITIAL_SURVEY_MODAL';
export type TOGGLE_INITIAL_SURVEY_MODAL = typeof TOGGLE_INITIAL_SURVEY_MODAL;
export interface ToggleInitialSurveyModal {
    type: TOGGLE_INITIAL_SURVEY_MODAL;
    shouldBeVisible: boolean;
}

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export type SEARCH_MOVIE = typeof SEARCH_MOVIE;
export interface SearchMovie {
    type: SEARCH_MOVIE;
    title: string;
}

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
    token: tokenReducer,
    initialSurveyVisible: toggleInitialSurveyModalReducer,
});

/**
 * Root of state object, contains typing for the entire state tree.
 */
export type RootState = ReturnType<typeof rootReducer>;
