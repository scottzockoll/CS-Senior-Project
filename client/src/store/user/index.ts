import { ApiRequest } from '../api';
import { Movie } from '../movie';
import { Tag } from '../tag';

export const REQUEST_USERS_STARTED = 'REQUEST_USERS_STARTED';
export const RECEIVE_USERS_SUCCESS = 'RECEIVE_USERS_SUCCESS';
export const RECEIVE_USERS_FAILURE = 'RECEIVE_USERS_FAILURE';

export const SEARCH_USERS_STARTED = 'SEARCH_USERS_STARTED';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

export const REQUEST_USER_STARTED = 'REQUEST_USER_STARTED';
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS';
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE';

export const REQUEST_AUTH_USER_STARTED = 'REQUEST_AUTH_USER_STARTED';
export const RECEIVE_AUTH_USER_SUCCESS = 'RECEIVE_AUTH_USER_SUCCESS';
export const RECEIVE_AUTH_USER_FAILURE = 'RECEIVE_AUTH_USER_FAILURE';

export type REQUEST_USERS_STARTED = typeof REQUEST_USERS_STARTED;
export type RECEIVE_USERS_SUCCESS = typeof RECEIVE_USERS_SUCCESS;
export type RECEIVE_USERS_FAILURE = typeof RECEIVE_USERS_FAILURE;

export type REQUEST_USER_STARTED = typeof REQUEST_USER_STARTED;
export type RECEIVE_USER_SUCCESS = typeof RECEIVE_USER_SUCCESS;
export type RECEIVE_USER_FAILURE = typeof RECEIVE_USER_FAILURE;

export type REQUEST_AUTH_USER_STARTED = typeof REQUEST_AUTH_USER_STARTED;
export type RECEIVE_AUTH_USER_SUCCESS = typeof RECEIVE_AUTH_USER_SUCCESS;
export type RECEIVE_AUTH_USER_FAILURE = typeof RECEIVE_AUTH_USER_FAILURE;

export type SEARCH_USERS_STARTED = typeof SEARCH_USERS_STARTED;
export type SEARCH_USERS_SUCCESS = typeof SEARCH_USERS_SUCCESS;
export type SEARCH_USERS_FAILURE = typeof SEARCH_USERS_FAILURE;

export type UsersEntitiesTypes =
    | REQUEST_USERS_STARTED
    | RECEIVE_USERS_SUCCESS
    | RECEIVE_USERS_FAILURE
    | SEARCH_USERS_STARTED
    | SEARCH_USERS_SUCCESS
    | SEARCH_USERS_FAILURE;

export const DELETE_USER_STARTED = 'DELETE_USER_STARTED';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export type DELETE_USER_STARTED = typeof DELETE_USER_STARTED;
export type DELETE_USER_SUCCESS = typeof DELETE_USER_SUCCESS;
export type DELETE_USER_FAILURE = typeof DELETE_USER_FAILURE;

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const TOKEN_UPDATE = 'TOKEN_UPDATE';
export const AUTH_USER = 'AUTH_USER';

/**
 * User search constants
 */
export enum UserSearchFilter {
    NO_FILTER = -1,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
}

export type USER_LOGIN = typeof USER_LOGIN;
export type USER_LOGOUT = typeof USER_LOGOUT;
export type TOKEN_UPDATE = typeof TOKEN_UPDATE;
export type AUTH_USER = typeof AUTH_USER;

export type UserAuthTypes = USER_LOGIN | USER_LOGOUT;

export const TOGGLE_USER_MODAL = 'TOGGLE_USER_MODAL';
export type TOGGLE_USER_MODAL = typeof TOGGLE_USER_MODAL;
export interface ToggleUserModal {
    type: TOGGLE_USER_MODAL;
    show: boolean;
}

/**
 * A single user.
 */
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    /**
     * An array of all movie ids that the user has rated.
     */
    movies: number[];
    /**
     * An array of all tag ids that the user has rated.
     */
    tags: number[];
}

export interface RequestUserStarted extends ApiRequest {
    type: REQUEST_USER_STARTED;
    id: number;
}

export interface ReceiveUserSuccess {
    type: RECEIVE_USER_SUCCESS;
    response: {
        entities: {
            users?: Record<number, User>;
            movies?: Record<number, Movie>;
            tags?: Record<number, Tag>;
        };
    };
}

export interface ReceiveUserFailure {
    type: RECEIVE_USER_FAILURE;
    id: number;
}

/**
 * Action that occurs when fetching a list of users starts.
 */
export interface RequestUsersStarted extends ApiRequest {
    type: REQUEST_USERS_STARTED;
    offset: number;
    limit: number;
}

/**
 * Action that occurs when fetching a specific user succeeds.
 */
export interface ReceiveUsersSuccess {
    type: RECEIVE_USERS_SUCCESS;
    response: {
        entities: {
            users?: Record<number, User>;
            movies?: Record<number, Movie>;
            tags?: Record<number, Tag>;
        };
    };
}

/**
 * Action that occurs when fetching a specific user fails.
 */
export interface ReceiveUsersFailure {
    type: RECEIVE_USERS_FAILURE;
    id: number;
}

/**
 * Action that occurs when searching user.
 */
export interface SearchUsersStarted extends ApiRequest {
    type: SEARCH_USERS_STARTED;
    searchValue: string;
    offset: number;
    limit: number;
}

/**
 * Action that occurs when fetching a specific user succeeds.
 */
export interface SearchUsersSuccess {
    type: SEARCH_USERS_SUCCESS;
    response: {
        entities: {
            users?: Record<number, User>;
            movies?: Record<number, Movie>;
            tags?: Record<number, Tag>;
        };
    };
}

/**
 * Action that occurs when fetching a specific user fails.
 */
export interface SearchUsersFailure {
    type: SEARCH_USERS_FAILURE;
    id: number;
}

export interface RequestAuthUserStarted extends ApiRequest {
    type: REQUEST_AUTH_USER_STARTED;
    email: string;
}

export interface ReceiveAuthUserSuccess {
    type: RECEIVE_AUTH_USER_SUCCESS;
    response: {
        entities: {
            users: Record<number, User>;
        };
        result: number;
    };
}

export interface ReceiveAuthUserFailure {
    type: RECEIVE_AUTH_USER_FAILURE;
    email: string;
}

/**
 * Any user entities retrieval action, that is a user entities Request {Start, Success, Failure}.
 */
export type UserEntitiesActions =
    | RequestUsersStarted
    | ReceiveUsersSuccess
    | SearchUsersStarted
    | SearchUsersSuccess
    | SearchUsersFailure
    | ReceiveUsersFailure
    | RequestUserStarted
    | ReceiveUserSuccess
    | ReceiveUserFailure
    | DeleteUserStarted
    | DeleteUserSuccess
    | DeleteUserFailure
    | RequestAuthUserStarted
    | ReceiveAuthUserSuccess
    | UserLogin
    | UserLogout
    | TokenUpdate;

/**
 * Action that occurs when the user logins in.
 */
export interface UserLogin {
    type: USER_LOGIN;
    id: number;
}

/**
 * Action that occurs when the user logs out.
 */
export interface UserLogout {
    type: USER_LOGOUT;
}

/**
 * Action that occurs when deleting a user account.
 */
export interface DeleteUserStarted extends ApiRequest {
    type: DELETE_USER_STARTED;
    id: number;
}

export interface DeleteUserSuccess {
    type: DELETE_USER_SUCCESS;
    id: number;
}

export interface DeleteUserFailure {
    type: DELETE_USER_FAILURE;
    id: number;
}

/**
 * Action that occurs when a new token is received or old token is refreshed
 */
export interface TokenUpdate {
    type: TOKEN_UPDATE;
    token: string | null;
}

export interface AuthUser {
    type: AUTH_USER;
}

/**
 * Any user authentication action, that is either Login or Logout
 */
export type UserAuthActions = UserLogin | UserLogout | TokenUpdate | AuthUser;
