import { CALL_API } from '../api';
import { SCHEMAS } from '../schema';
import { AppAction, AsyncActionStatus } from '../index';
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
    SEARCH_USERS_FAILURE,
    SEARCH_USERS_STARTED,
    SEARCH_USERS_SUCCESS,
    SearchUsersStarted,
    TOKEN_UPDATE,
    TokenUpdate,
    USER_LOGIN,
    USER_LOGOUT,
    UserLogin,
    UserLogout,
    UserSearchFilter,
    REQUEST_USER_STARTED,
    RequestUserStarted,
    RECEIVE_USER_SUCCESS,
    RECEIVE_USER_FAILURE,
    TOGGLE_USER_MODAL,
    TOGGLE_SEARCH_USER,
    RequestRecommendationsStarted,
    REQUEST_RECOMMENDATIONS_STARTED,
    RECEIVE_RECOMMENDATIONS_SUCCESS,
    RECEIVE_RECOMMENDATIONS_FAILURE,
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

export function updateToken(token: string | null): TokenUpdate {
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
            schema: SCHEMAS['USER'],
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

export function requestUsers(offset: number, limit: number): RequestUsersStarted {
    return {
        offset,
        limit,
        type: REQUEST_USERS_STARTED,
        [CALL_API]: {
            endpoint: `user/${limit}/${offset}`,
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

export function requestRecommendations(id: number): RequestRecommendationsStarted {
    return {
        id,
        type: REQUEST_RECOMMENDATIONS_STARTED,
        [CALL_API]: {
            endpoint: `recommendation/${id}`,
            schema: SCHEMAS['MOVIE_ARRAY'],
            method: 'GET',
            body: {},
            types: {
                [AsyncActionStatus.Request]: REQUEST_RECOMMENDATIONS_STARTED,
                [AsyncActionStatus.Success]: RECEIVE_RECOMMENDATIONS_SUCCESS,
                [AsyncActionStatus.Failure]: RECEIVE_RECOMMENDATIONS_FAILURE,
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

/**
 * API Request for searching users by the desired
 * filter (Email, FirstName, LastName).
 *
 * @param searchFilter The search filter enum
 * @param searchVal The value to search in the desired column
 * @param offset The query offset
 * @param limit The query result limit
 */
export function searchUsers(
    searchFilter: UserSearchFilter,
    searchValue: string,
    offset: number,
    limit: number
): SearchUsersStarted {
    let endpoint = '';

    // Check the requested search filter
    switch (searchFilter) {
        case UserSearchFilter.EMAIL:
            endpoint = `user/search/email/${searchValue}/${offset}/${limit}`;
            break;
        case UserSearchFilter.FIRST_NAME:
            endpoint = `user/search/first-name/${searchValue}/${offset}/${limit}`;
            break;
        case UserSearchFilter.LAST_NAME:
            endpoint = `user/search/last-name/${searchValue}/${offset}/${limit}`;
    }

    return {
        searchValue,
        offset,
        limit,
        type: SEARCH_USERS_STARTED,
        [CALL_API]: {
            endpoint: endpoint,
            schema: SCHEMAS['USER_ARRAY'],
            method: 'GET',
            body: {},
            types: {
                [AsyncActionStatus.Request]: SEARCH_USERS_STARTED,
                [AsyncActionStatus.Success]: SEARCH_USERS_SUCCESS,
                [AsyncActionStatus.Failure]: SEARCH_USERS_FAILURE,
            },
        },
    };
}

export function toggleUserModal(shouldBeVisible: boolean): AppAction {
    return {
        type: TOGGLE_USER_MODAL,
        show: shouldBeVisible,
    };
}

export function toggleSearchUser(searching: boolean): AppAction {
    return {
        type: TOGGLE_SEARCH_USER,
        searching: searching,
    };
}
