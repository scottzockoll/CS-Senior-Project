import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';
import {
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    REQUEST_USER_STARTED,
    RequestUserStarted,
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

export function requestSingleUser(id: number): RequestUserStarted {
    return {
        id,
        type: REQUEST_USER_STARTED,
        [CALL_API]: {
            endpoint: `user/${id}`,
            schema: SCHEMAS['USER_ARRAY'],
            types: {
                [AsyncActionStatus.Request]: REQUEST_USER_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_USER_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_USER_FAILURE,
            },
        },
    };
}

export function requestUsers(idOffset: number, limit: number): RequestUsersStarted {
    return {
        idOffset,
        limit,
        type: REQUEST_USERS_STARTED,
        [CALL_API]: {
            // TODO use 'user/idOffset/limit' when it's implemented
            endpoint: `user/${idOffset}`,
            schema: SCHEMAS['USER_ARRAY'],
            types: {
                [AsyncActionStatus.Request]: REQUEST_USERS_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_USERS_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_USERS_FAILURE,
            },
        },
    };
}
