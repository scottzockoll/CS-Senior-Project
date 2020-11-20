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
import {
    MOVIE_SEARCH_TYPES,
    MovieDeleteActions,
    MovieDeleteEntitiesTypes,
    MovieEntitiesActions,
    MovieUpdateEntitiesTypes,
    SearchMovieActions,
} from './movie';
import { deleteMoviesReducer, movieSearchReducer } from './movie/reducers';
import { toggleInitialSurveyModalReducer } from '../routes/home/reducers';

export type AppAction =
    | UserEntitiesActions
    | ToggleInitialSurveyModal
    | SearchMovieActions
    | MovieEntitiesActions
    | MovieDeleteActions;

export type ActionType =
    | UsersEntitiesTypes
    | TOGGLE_INITIAL_SURVEY_MODAL
    | MOVIE_SEARCH_TYPES
    | MovieUpdateEntitiesTypes
    | MovieDeleteEntitiesTypes;

export const TOGGLE_INITIAL_SURVEY_MODAL = 'TOGGLE_INITIAL_SURVEY_MODAL';
export type TOGGLE_INITIAL_SURVEY_MODAL = typeof TOGGLE_INITIAL_SURVEY_MODAL;
export interface ToggleInitialSurveyModal {
    type: TOGGLE_INITIAL_SURVEY_MODAL;
    shouldBeVisible: boolean;
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
    movies: usersMoviesReducer,
    tags: usersTagsReducer,
    token: tokenReducer,
    initialSurveyVisible: toggleInitialSurveyModalReducer,
    deleteUser: deleteUserReducer,
    deleteMovies: deleteMoviesReducer,
    movieSearchResults: movieSearchReducer,
});

/**
 * Root of state object, contains typing for the entire state tree.
 */
export type RootState = ReturnType<typeof rootReducer>;
