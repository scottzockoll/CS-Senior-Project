import { ApiRequest } from '../api';
import { Movie } from '../movie';
import { Tag } from '../tag';

export const REQUEST_USERS_STARTED = 'REQUEST_USERS_STARTED';
export const RECEIVE_USERS_SUCCESS = 'RECEIVE_USERS_SUCCESS';
export const RECEIVE_USERS_FAILURE = 'RECEIVE_USERS_FAILURE';

export const REQUEST_AUTH_USER_STARTED = 'REQUEST_AUTH_USER_STARTED';
export const RECEIVE_AUTH_USER_SUCCESS = 'RECEIVE_AUTH_USER_SUCCESS';
export const RECEIVE_AUTH_USER_FAILURE = 'RECEIVE_AUTH_USER_FAILURE';

export type REQUEST_USERS_STARTED = typeof REQUEST_USERS_STARTED;
export type RECEIVE_USERS_SUCCESS = typeof RECEIVE_USERS_SUCCESS;
export type RECEIVE_USERS_FAILURE = typeof RECEIVE_USERS_FAILURE;

export type REQUEST_AUTH_USER_STARTED = typeof REQUEST_AUTH_USER_STARTED;
export type RECEIVE_AUTH_USER_SUCCESS = typeof RECEIVE_AUTH_USER_SUCCESS;
export type RECEIVE_AUTH_USER_FAILURE = typeof RECEIVE_AUTH_USER_FAILURE;

export type UsersEntitiesTypes = REQUEST_USERS_STARTED | RECEIVE_USERS_SUCCESS | RECEIVE_USERS_FAILURE;

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const TOKEN_UPDATE = 'TOKEN_UPDATE';
export const AUTH_USER = 'AUTH_USER';

export type USER_LOGIN = typeof USER_LOGIN;
export type USER_LOGOUT = typeof USER_LOGOUT;
export type TOKEN_UPDATE = typeof TOKEN_UPDATE;
export type AUTH_USER = typeof AUTH_USER;

export type UserAuthTypes = USER_LOGIN | USER_LOGOUT;

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
    movies: Record<number, Movie>;
    /**
     * An array of all tag ids that the user has rated.
     */
    tags: number[];
}

/**
 * Action that occurs when fetching a list of users starts.
 */
export interface RequestUsersStarted extends ApiRequest {
    type: REQUEST_USERS_STARTED;
    idOffset: number;
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

export interface RequestAuthUserStarted extends ApiRequest {
    type: REQUEST_AUTH_USER_STARTED;
    email: string;
}

export interface ReceiveAuthUserSuccess {
    type: RECEIVE_AUTH_USER_SUCCESS;
    id: number;
}

export interface ReceiveAuthUserFailure {
    type: RECEIVE_AUTH_USER_FAILURE;
    email: string;
}

/**
 * Any user entities retrieval action, that is a user entities Request {Start, Success, Failure}.
 */
export type UserEntitiesActions =
    | RequestAuthUserStarted
    | ReceiveAuthUserSuccess
    | ReceiveUsersFailure
    | RequestUsersStarted
    | ReceiveUsersSuccess
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
 * Action that occurs when a new token is received or old token is refreshed
 */
export interface TokenUpdate {
    type: TOKEN_UPDATE;
    token: string;
}

export interface AuthUser {
    type: AUTH_USER;
}

/**
 * Any user authentication action, that is either Login or Logout
 */
export type UserAuthActions = UserLogin | UserLogout | TokenUpdate | AuthUser;
