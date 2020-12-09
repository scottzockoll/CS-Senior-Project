import {
    RECEIVE_RECOMMENDATIONS_FAILURE,
    RECEIVE_RECOMMENDATIONS_SUCCESS,
    RECEIVE_USER_FAILURE,
    RECEIVE_USER_SUCCESS,
    RECEIVE_USERS_FAILURE,
    RECEIVE_USERS_SUCCESS,
    REQUEST_RECOMMENDATIONS_STARTED,
    REQUEST_USER_STARTED,
    REQUEST_USERS_STARTED,
    SEARCH_USERS_FAILURE,
    SEARCH_USERS_STARTED,
    SEARCH_USERS_SUCCESS,
    TOGGLE_SEARCH_USER,
    TOGGLE_USER_MODAL,
    User,
    USER_LOGOUT,
    UserAuthActions,
    UserEntitiesActions,
} from './index';
import { NestedPaginated, Paginated, RecommendationResults } from '../types';
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

const initialRecommendationsState: RecommendationResults = {
    isFetching: false,
    movieTitles: [
        'Ant-Man (2015)',
        '48 Hours (1982)',
        'The Wolf of Wall St. (2013)',
        'Spider-Man: Homecoming (2017)',
        'Saving Private Ryan (1998)',
        'Elf (2003)',
        'Christmas Vacation (1989)',
        'What Happened to Monday? (2017)',
        'Wedding Crashers (2005)',
        'Blackhawk Down (2001)',
        'Beverly Hills Cop (1984)',
        'Guardians of the Galaxy (2014)',
        'Scream (1996)',
        'Halloween (1978)',
        'Toy Story (1995)',
        'Cars (2006)',
        'Captain America: The First Avenger (2011)',
        'Avatar (2009)',
        'Deadpool (2016)',
        'The Sound of Music (1965)',
        'Freaky Friday (2003)',
        'Doctor Strange (2016)',
        'Star Wars: The Last Jedi (2017)',
        'Zootopia (2016)',
        'Finding Nemo (2003)',
    ],
};

export function recommendationsReducer(
    state = initialRecommendationsState,
    action: UserEntitiesActions
): RecommendationResults {
    switch (action.type) {
        case REQUEST_RECOMMENDATIONS_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_RECOMMENDATIONS_SUCCESS:
            if (action.response.entities.movies) {
                return {
                    movieTitles: Object.values(action.response.entities.movies).map((movie) => movie.title),
                    isFetching: false,
                };
            } else {
                return {
                    ...state,
                    isFetching: false,
                };
            }
        case RECEIVE_RECOMMENDATIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        case USER_LOGOUT:
            return initialRecommendationsState;
        default:
            return state;
    }
}

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
        case SEARCH_USERS_SUCCESS:
            const searchedUsers: Record<number, User> | undefined = action.response.entities.users;
            if (action.response.entities.movies) {
                return {
                    ...state,
                    ids: [...state.ids, ...Object.values(searchedUsers as Object).map((user) => user.id)],
                    entities: {
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
