import {
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_USER_STARTED,
    REQUEST_USERS_STARTED,
    SEARCH_USERS_FAILURE,
    SEARCH_USERS_STARTED,
    SEARCH_USERS_SUCCESS,
    TOGGLE_SEARCH_USER,
    TOGGLE_USER_MODAL,
    User,
    UserAuthActions,
    UserEntitiesActions,
} from './index';
import { NestedPaginated, Paginated } from '../types';
import {
    Movie,
    Rating,
    RECEIVE_MOVIE_FAILURE,
    RECEIVE_MOVIE_SUCCESS,
    REQUEST_MOVIE_STARTED,
    RequestMovieAction,
} from '../movie';
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

export function usersMoviesReducer(
    state = initialMovieEntitiesState,
    action: UserEntitiesActions | RequestMovieAction
): Paginated<Movie> {
    switch (action.type) {
        case REQUEST_MOVIE_STARTED:
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
        case SEARCH_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
        case SEARCH_USERS_SUCCESS:
            const users: Record<number, User> | undefined = action.response.entities.users;
            if (action.response.entities.movies) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(users as Object).map((user) => user.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.movies,
                    },
                    isFetching: false,
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                };
            }
        case RECEIVE_MOVIE_SUCCESS:
            if (action.response.entities.movies) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.movies).map((movie) => movie.id)],
                    entities: {
                        ...state.entities,
                        ...action.response.entities.movies,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case SEARCH_USERS_FAILURE:
        case RECEIVE_MOVIE_FAILURE:
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

const initialRatingsEntitiesState: NestedPaginated<Rating> = {
    ids: [],
    entities: {},
    isFetching: false,
};

export function userRatingsReducer(
    state = initialRatingsEntitiesState,
    action: UserEntitiesActions
): NestedPaginated<Rating> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            const movies: Record<number, Movie> | undefined = action.response.entities.movies;
            let entities: Record<number, Record<number, Rating>> = {};
            if (action.response.entities.movies) {
                let ratings: Array<Rating> = [
                    ...Object.values(movies as Object).map((movie) => ({
                        userId: movie.parentId,
                        rating: movie.rating,
                        movieId: movie.id,
                        feedbackId: movie.feedbackId,
                    })),
                ];
                for (let r in ratings) {
                    let rating: Rating = ratings[r];
                    if (entities[rating.userId] === undefined) {
                        entities[rating.userId] = { [rating.movieId]: rating };
                    } else {
                        entities[rating.userId][rating.movieId] = rating;
                    }
                }
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.movies).map((movie) => movie.id)],
                    entities: {
                        ...state.entities,
                        ...entities,
                    },
                    isFetching: false,
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                };
            }
        case RECEIVE_USER_FAILURE:
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
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            const tags: Record<number, Tag> | undefined = action.response.entities.tags;
            if (action.response.entities.tags) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(tags as Object).map((tag) => tag.id)],
                    entities: {
                        ...state.entities,
                        ...Object.values(action.response.entities.tags),
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

const initialTagRatingEntitiesState: NestedPaginated<Tag[]> = {
    ids: [],
    entities: {},
    isFetching: false,
};

export function usersTagRatingsReducer(
    state = initialTagRatingEntitiesState,
    action: UserEntitiesActions
): NestedPaginated<Tag[]> {
    switch (action.type) {
        case REQUEST_USER_STARTED:
        case REQUEST_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USER_SUCCESS:
        case RECEIVE_USERS_SUCCESS:
            const users: Record<number, User> | undefined = action.response.entities.users;
            const tags: Record<number, Tag> | undefined = action.response.entities.tags;
            const entities: Record<number, Record<number, Tag[]>> | undefined = {};
            if (tags) {
                for (let t in action.response.entities.tags) {
                    let tag: Tag = tags[parseInt(t)];
                    if (entities.hasOwnProperty(tag.userId)) {
                        if (entities[tag.userId].hasOwnProperty(tag.movieId)) {
                            entities[tag.userId][tag.movieId].push(tag);
                        } else {
                            entities[tag.userId][tag.movieId] = [tag];
                        }
                    } else {
                        entities[tag.userId] = { [tag.movieId]: [] };
                        entities[tag.userId][tag.movieId].push(tag);
                    }
                }
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(users as Object).map((user) => user.id)],
                    entities: {
                        ...state.entities,
                        ...entities,
                    },
                    isFetching: false,
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                };
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

export function toggleUserModalReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_USER_MODAL:
            return action.show;
        default:
            return state;
    }
}

export function toggleSearchUserReducer(state = false, action: AppAction): boolean {
    switch (action.type) {
        case TOGGLE_SEARCH_USER:
            return action.searching;
        default:
            return state;
    }
}

export function searchUsersReducer(state = initialUserEntitiesState, action: UserEntitiesActions): Paginated<User> {
    switch (action.type) {
        case SEARCH_USERS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case SEARCH_USERS_SUCCESS:
            if (action.response.entities.users) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
                    entities: {
                        ...action.response.entities.users,
                    },
                    isFetching: false,
                };
            } else {
                return state;
            }
        case SEARCH_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
