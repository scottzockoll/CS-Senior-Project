import { User } from '../user/index';
import { ApiRequest } from '../api';

export const DELETE_USER_STARTED = 'REQUEST_USER_STARTED';
export const DELETE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'RECEIVE_USER_FAILURE';
export const DELETE_USER = 'DELETE_USER';

export type DELETE_USER_STARTED = typeof DELETE_USER_STARTED;
export type DELETE_USER_SUCCESS = typeof DELETE_USER_SUCCESS;
export type DELETE_USER_FAILURE = typeof DELETE_USER_FAILURE;
export type DELETE_USER = typeof DELETE_USER;

export interface DeleteUserStarted extends ApiRequest {
    type: typeof DELETE_USER_STARTED;
    id: number;
}

export interface DeleteUserSuccess {
    type: typeof DELETE_USER_SUCCESS;
    response: {
        entities: {
            users: Record<number, User>;
        };
    };
}

export interface DeleteUserFailure {
    type: typeof DELETE_USER_FAILURE;
    id: number;
}

export interface DeleteUser {
    type: typeof DELETE_USER;
    id: number;
}

export type DeleteActions = DeleteUserStarted | DeleteUserSuccess | DeleteUserFailure | DeleteUser;
