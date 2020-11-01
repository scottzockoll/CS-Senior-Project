import {
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    REQUEST_USER_STARTED,
    User,
    UserAuthActions,
    UserEntitiesActions,
} from './index';
import { Paginated } from '../types';

const initialUserAuthState: number = -1;

export function userAuthReducer(state = initialUserAuthState, action: UserAuthActions): number {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.payload;
        case 'USER_LOGOUT':
            return -1;
        default:
            return state;
    }
}

const initialUserEntitiesState: Paginated<User> = {
    ids: new Set(),
    entities: {},
    pages: new Set(),
    prevPage: '',
    nextPage: '',
    isFetching: false,
};

// const updatePagination = (
//     state = {
//         isFetching: false,
//         nextPageUrl: undefined,
//         pageCount: 0,
//         ids: [],
//     },
//     action
// ) => {
//     switch (action.type) {
//         case requestType:
//             return {
//                 ...state,
//                 isFetching: true,
//             };
//         case successType:
//             return {
//                 ...state,
//                 isFetching: false,
//                 ids: union(state.ids, action.response.result),
//                 nextPageUrl: action.response.nextPageUrl,
//                 pageCount: state.pageCount + 1,
//             };
//         case failureType:
//             return {
//                 ...state,
//                 isFetching: false,
//             };
//         default:
//             return state;
//     }
// };
//
// return (state = {}, action) => {
//     // Update pagination by key
//     switch (action.type) {
//         case requestType:
//         case successType:
//         case failureType:
//             const key = mapActionToKey(action)
//             if (typeof key !== 'string') {
//                 throw new Error('Expected key to be a string.')
//             }
//             return {
//                 ...state,
//                 [key]: updatePagination(state[key], action)
//             }
//         default:
//             return state
//     }
// }

export function usersReducer(state = initialUserEntitiesState, action: UserEntitiesActions): Paginated<User> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case RECEIVE_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
