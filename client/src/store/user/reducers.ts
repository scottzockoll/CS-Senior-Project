import {
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_USERS_STARTED,
    SEARCH_USERS_FAILURE,
    SEARCH_USERS_STARTED,
    SEARCH_USERS_SUCCESS,
    User,
    UserAuthActions,
    UserEntitiesActions,
} from './index';
import { Paginated } from '../types';
import { Movie } from '../movie';
import { Tag } from '../tag';

const initialUserAuthState: number = -1;

export function userAuthReducer(state = initialUserAuthState, action: UserEntitiesActions): number {
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
        case REQUEST_USERS_STARTED:
        case SEARCH_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USERS_SUCCESS:
            if (action.response.entities.users) {
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
            } else {
                return state;
            }
        case SEARCH_USERS_SUCCESS:
            if (action.response.entities.users) {
                return {
                    ...state,
                    ids: [...Object.values(action.response.entities.users).map((user) => user.id)],
                    entities: {
                        ...action.response.entities.users,
                    },
                    nextPage: state.nextPage, // TODO
                    prevPage: state.prevPage, // TODO
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USERS_FAILURE:
        case SEARCH_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}

const initialMovieEntitiesState: Paginated<Movie> = {
    ids: [],
    entities: {},
    pages: [],
    prevPage: '',
    nextPage: '',
    isFetching: false,
};
export function usersMoviesReducer(state = initialMovieEntitiesState, action: UserEntitiesActions): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USERS_SUCCESS:
            if (action.response.entities.movies) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.movies).map((movie) => movie.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.movies,
                    },
                    nextPage: state.nextPage, // TODO
                    prevPage: state.prevPage, // TODO
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}

const initialTagEntitiesState: Paginated<Tag> = {
    ids: [],
    entities: {},
    pages: [],
    prevPage: '',
    nextPage: '',
    isFetching: false,
};

export function usersTagsReducer(state = initialTagEntitiesState, action: UserEntitiesActions): Paginated<Tag> {
    switch (action.type) {
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USERS_SUCCESS:
            if (action.response.entities.tags) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.tags).map((tag) => tag.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.tags,
                    },
                    nextPage: state.nextPage, // TODO
                    prevPage: state.prevPage, // TODO
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
