import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { combineReducers } from 'redux';
import { ToggleUserModal, TOGGLE_USER_MODAL, UserEntitiesActions, UsersEntitiesTypes, ToggleSearchUser } from './user';
import {
    deleteUserReducer,
    searchUsersReducer,
    toggleSearchUserReducer,
    toggleUserModalReducer,
    tokenReducer,
    userAuthReducer,
    userRatingsReducer,
    usersMoviesReducer,
    usersReducer,
    usersTagRatingsReducer,
    usersTagsReducer,
} from './user/reducers';
import {
    MovieDeleteActions,
    MovieDeleteEntitiesTypes,
    MovieEntitiesActions,
    MovieUpdateEntitiesTypes,
    TOGGLE_MOVIE_MODAL,
    ToggleMovieModal,
} from './movie';
import { deleteMoviesReducer } from './movie/reducers';
import { toggleInitialSurveyModalReducer, toggleMovieModalReducer } from './home/reducers';
import { TOGGLE_INITIAL_SURVEY_MODAL, ToggleInitialSurveyModal } from './home';

export type AppAction =
    | UserEntitiesActions
    | ToggleInitialSurveyModal
    | MovieEntitiesActions
    | MovieDeleteActions
    | ToggleMovieModal
    | ToggleUserModal
    | ToggleSearchUser;

export type ActionType =
    | UsersEntitiesTypes
    | MovieUpdateEntitiesTypes
    | MovieDeleteEntitiesTypes
    | TOGGLE_INITIAL_SURVEY_MODAL
    | TOGGLE_MOVIE_MODAL
    | TOGGLE_USER_MODAL;

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
    searchedUsers: searchUsersReducer,
    movies: usersMoviesReducer,
    tags: usersTagsReducer,
    tagRatings: usersTagRatingsReducer,
    ratings: userRatingsReducer,
    token: tokenReducer,
    surveyVisible: toggleInitialSurveyModalReducer,
    deleteUser: deleteUserReducer,
    deleteMovies: deleteMoviesReducer,
    movieModal: toggleMovieModalReducer,
    showUserModal: toggleUserModalReducer,
    searchingUser: toggleSearchUserReducer,
    // TODO: Should be loaded from the server (in HTML, query, etc), but not important for this project.
    googleClientId: () => '962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com',
});

/**
 * Root of state object, contains typing for the entire state tree.
 */
export type RootState = ReturnType<typeof rootReducer>;
