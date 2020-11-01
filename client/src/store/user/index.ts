import { Movie } from '../movie';
import { Tag } from '../../Types';

export const REQUEST_USER_STARTED = 'REQUEST_USER_STARTED';
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS';
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE';

export type REQUEST_USER_STARTED = typeof REQUEST_USER_STARTED;
export type RECEIVE_USER_SUCCESS = typeof RECEIVE_USER_SUCCESS;
export type RECEIVE_USER_FAILURE = typeof RECEIVE_USER_FAILURE;

export type UserEntitiesTypes = REQUEST_USER_STARTED | RECEIVE_USER_SUCCESS | RECEIVE_USER_FAILURE;

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export type USER_LOGIN = typeof USER_LOGIN;
export type USER_LOGOUT = typeof USER_LOGOUT;

export type UserAuthTypes = USER_LOGIN | USER_LOGOUT;

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    movies: Record<number, Movie>;
    tags: Record<number, Tag>;
}

export interface RequestUserStarted {
    type: REQUEST_USER_STARTED;
    id: number;
}
export interface ReceiveUserSuccess {
    type: RECEIVE_USER_SUCCESS;
    payload: User[];
}
export interface ReceiveUserFailure {
    type: RECEIVE_USER_FAILURE;
    id: number;
}

export type UserEntitiesActions = RequestUserStarted | ReceiveUserSuccess | ReceiveUserFailure;

export interface UserLogin {
    type: USER_LOGIN;
    payload: number;
}
export interface UserLogout {
    type: USER_LOGOUT;
}

export type UserAuthActions = UserLogin | UserLogout;
