import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AsyncActionStatus } from '../index';
import { DeleteUserStarted, DELETE_USER_STARTED, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from './index';

export function deleteCurrentUser(id: number): DeleteUserStarted {
    return {
        id,
        type: DELETE_USER_STARTED,
        [CALL_API]: {
            endpoint: `user/${id}`,
            schema: SCHEMAS['USER_ARRAY'],
            types: {
                [AsyncActionStatus.Request]: DELETE_USER_STARTED,
                [AsyncActionStatus.Success]: DELETE_USER_SUCCESS,
                [AsyncActionStatus.Failure]: DELETE_USER_FAILURE,
            },
        },
    };
}
