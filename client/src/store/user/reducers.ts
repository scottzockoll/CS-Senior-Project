import {
    DELETE_USER_FAILURE,
    DELETE_USER_STARTED,
    DELETE_USER_SUCCESS,
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_USER_STARTED,
    REQUEST_USERS_STARTED,
    User,
    UserAuthActions,
    UserEntitiesActions,
    TOGGLE_USER_MODAL,
} from './index';
import { Paginated } from '../types';
import { Movie, Rating } from '../movie';
import { Tag } from '../tag';
import { AppAction } from '..';

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

const initialUserTokenState: string | null = '';

export function tokenReducer(state = initialUserTokenState, action: UserAuthActions): typeof initialUserTokenState {
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
    isFetching: false,
};

export function usersReducer(state = initialUserEntitiesState, action: UserEntitiesActions): Paginated<User> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            if (action.response.entities.users) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.users,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USER_FAILURE:
        case RECEIVE_USERS_FAILURE:
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
    isFetching: false,
};

// @ts-ignore
export function usersMoviesReducer(state = initialMovieEntitiesState, action: UserEntitiesActions): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            console.log(action.response.entities);
            if (action.response.entities.movies) {
                return {
                    ...state,
                    // @ts-ignore
                    ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.movies,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USER_FAILURE:
        case RECEIVE_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}

const initialRatingsEntitiesState: Paginated<Rating> = {
    ids: [],
    entities: {},
    isFetching: false,
};

// @ts-ignore
export function userRatingsReducer(
    state = initialRatingsEntitiesState,
    action: UserEntitiesActions
): Paginated<Rating> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            let entities: Record<number, Rating> = {};
            // @ts-ignore
            let ratings: Array<Rating> = [
                ...Object.values(action.response.entities.movies).map((movie) => ({
                    user_id: movie.parentId,
                    rating: movie.rating,
                    movie_id: movie.id,
                })),
            ];
            for (let r in ratings) {
                let rating: Rating = ratings[r];
                if (entities[rating.user_id] == undefined) {
                    // @ts-ignore
                    entities[rating.user_id] = {};
                }
                // @ts-ignore
                entities[rating.user_id][rating.movie_id] = rating;
            }
            console.log(entities);
            if (action.response.entities.movies) {
                return {
                    ...state,
                    // @ts-ignore
                    ids: [...state.ids, ...Object.values(action.response.entities.movies).map((movie) => movie.id)],
                    entities: {
                        ...state.entities,
                        ...entities,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case RECEIVE_USER_FAILURE:
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
                    // @ts-ignore
                    ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.tags,
                    },
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

export function deleteUserReducer(state = -1, action: UserEntitiesActions): number {
    switch (action.type) {
        case DELETE_USER_STARTED:
            return action.id;
        case DELETE_USER_SUCCESS:
            return -1;
        case DELETE_USER_FAILURE:
            return action.id;
        default:
            return state;
    }
}

export function toggleUserModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_USER_MODAL:
            return action.show;
        default:
            return state;
    }
}
