import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';
import {
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    REQUEST_USER_STARTED,
    RECEIVE_AUTH_USER_FAILURE,
    RECEIVE_AUTH_USER_SUCCESS,
    REQUEST_AUTH_USER_STARTED,
    RequestAuthUserStarted,
    RequestUserStarted,
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

export function requestSingleUser(id: number): RequestUserStarted {
    return {
        id,
        type: REQUEST_USER_STARTED,
        [CALL_API]: {
            endpoint: `user/${id}`,
            schema: SCHEMAS['USER_ARRAY'],
            method: 'GET',
            body: {},
            types: {
                [AsyncActionStatus.Request]: REQUEST_USER_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_USER_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_USER_FAILURE,
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