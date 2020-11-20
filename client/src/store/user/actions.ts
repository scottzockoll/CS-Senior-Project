import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';
import {
    DELETE_USER_FAILURE,
    DELETE_USER_STARTED,
    DELETE_USER_SUCCESS,
    DeleteUserStarted,
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_USERS_STARTED,
    RECEIVE_AUTH_USER_FAILURE,
    RECEIVE_AUTH_USER_SUCCESS,
    REQUEST_AUTH_USER_STARTED,
    RequestAuthUserStarted,
    RequestUsersStarted,
    TOKEN_UPDATE,
    TokenUpdate,
    USER_LOGIN,
    USER_LOGOUT,
    UserLogin,
    UserLogout,
} from './index';

export function userLogin(id: number): UserLogin {
    return {
        type: USER_LOGIN,
        id,
    };
}

export function userLogout(): UserLogout {
    return {
        type: USER_LOGOUT,
    };
}

export function updateToken(token: string): TokenUpdate {
    return {
        type: TOKEN_UPDATE,
        token: token,
    };
}

export function requestUsers(idOffset: number, limit: number): RequestUsersStarted {
    return {
        idOffset,
        limit,
        type: REQUEST_USERS_STARTED,
        [CALL_API]: {
            endpoint: `user/${limit}/${idOffset}`,
            schema: SCHEMAS['USER_ARRAY'],
            method: 'GET',
            body: {},
            types: {
                [AsyncActionStatus.Request]: REQUEST_USERS_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_USERS_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_USERS_FAILURE,
            },
        },
    };
}

/**
 * API request for deleting the specified user account.
 * @param id The user's id
 */
export function deleteUser(id: number): DeleteUserStarted {
    return {
        id,
        type: DELETE_USER_STARTED,
        [CALL_API]: {
            endpoint: `user/${id}`,
            method: 'DELETE',
            schema: SCHEMAS['NULL'],
            body: {},
            types: {
                [AsyncActionStatus.Request]: DELETE_USER_STARTED,
                [AsyncActionStatus.Success]: DELETE_USER_SUCCESS,
                [AsyncActionStatus.Failure]: DELETE_USER_FAILURE,
            },
        },
    };
}

export function requestAuthenticateUser(email: string, authToken: string): RequestAuthUserStarted {
    return {
        email,
        type: REQUEST_AUTH_USER_STARTED,
        [CALL_API]: {
            endpoint: `auth/${email}`,
            schema: SCHEMAS['USER'],
            method: 'POST',
            body: {
                auth_token: authToken,
            },
            types: {
                [AsyncActionStatus.Request]: REQUEST_AUTH_USER_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_AUTH_USER_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_AUTH_USER_FAILURE,
            },
        },
    };
}
