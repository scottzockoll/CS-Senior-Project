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
            return action.id;
        case 'USER_LOGOUT':
            return -1;
        default:
            return state;
    }
}

const initialUserTokenState: string = '';
export function tokenReducer(state = initialUserTokenState, action: UserAuthActions): string {
    switch (action.type) {
        case 'TOKEN_UPDATE':
            return action.token;
        default:
            return state;
    }
}

const initialUserEntitiesState: Paginated<User> = {
    ids: [],
    entities: {},
    pages: [],
    prevPage: '',
    nextPage: '',
    isFetching: false,
};

export function usersReducer(state = initialUserEntitiesState, action: UserEntitiesActions): Paginated<User> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
            console.log(action);
            return {
                ...state,
                ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
                entities: {
                    ...state.entities,
                    ...action.response.entities.users,
                },
                nextPage: state.nextPage, // TODO
                prevPage: state.prevPage, // TODO
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
