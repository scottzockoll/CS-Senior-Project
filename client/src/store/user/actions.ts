import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';
import {
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
            endpoint: `user/${idOffset}/${limit}`,
            schema: SCHEMAS['USER_ARRAY'],
            types: {
                [AsyncActionStatus.Request]: REQUEST_USERS_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_USERS_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_USERS_FAILURE,
            },
        },
    };
}
