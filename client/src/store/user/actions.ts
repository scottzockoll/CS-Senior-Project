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
    RequestUsersStarted,
    USER_LOGIN,
    UserLogin,
} from './index';

export function userLogin(id: number): UserLogin {
    return {
        type: USER_LOGIN,
        id,
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
 *
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
