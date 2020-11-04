import {
    User,
    Movie,
    Recommendations,
    ActionTypes,
    GET_USER,
    GET_USERS,
    GET_MOVIE,
    GET_RECOMMENDATIONS,
} from './Types';

// Reducers take state and an action and then returns a new state after the
// action was applied.

// It is a common pattern for the reducers to use the spread operator (...)
// You can think of the spread operator as "unloading" an object into a new
// object. For example:

// a = {
//     'dog': 'bark',
//     'cat': 'meow'
// }

// b = {
//     ...a,
//     'fox': '???'
// }

// Object b is actually:

// b = {
//     'dog': 'bark',
//     'cat': 'meow',
//     'fox': '???'
// }

const initialUserState: User = {
    userId: -1,
    isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    watchedMovies: {},
    tags: {},
};

const initialUsersState: User[] = [];

export function userReducer(state = initialUserState, action: ActionTypes): User {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                // This is where the API request would be made.
                // Note that currently our API returns firstName, lastName, id, isAdmin, and email
                // but the design doc says it should return firstName, lastName, isAdmin, movies, and tags
                userId: 1,
                firstName: 'Scott',
                lastName: 'Zockoll',
                isAdmin: false,
                email: 'szockoll@s.r.e',
                watchedMovies: {},
                tags: {},
            };
        default:
            return state;
    }
}

export function usersReducer(state = initialUsersState, action: ActionTypes): User[] {
    switch (action.type) {
        case GET_USERS:
            // This is where the API request would be made. The action.idOffset
            // and action.limit will be used to make the API request.
            return [
                {
                    ...state,
                    userId: 1,
                    firstName: 'Scott',
                    lastName: 'Zockoll',
                    isAdmin: false,
                    email: 'szockoll@s.r.e',
                    watchedMovies: {},
                    tags: {},
                },
                {
                    ...state,
                    userId: 2,
                    firstName: 'Elvin',
                    lastName: 'Torres',
                    isAdmin: false,
                    email: 'torres62@s.r.e',
                    watchedMovies: [
                        {
                            movieId: 1,
                            movieName: 'Lord of the Rings: The Fellowship of the Ring',
                            genres: ['Fantasy', 'Adventure'],
                            userRating: 5,
                        },
                    ],
                    tags: {},
                },
            ];
        default:
            return state;
    }
}

const initialMovieState: Movie = {
    movieId: -1,
    movieName: '',
    genres: [],
};

export function movieReducer(state = initialMovieState, action: ActionTypes): Movie {
    switch (action.type) {
        case GET_MOVIE:
            return {
                ...state,
                // This is where the API request would be made
                movieId: 1,
                movieName: 'Terminator',
                genres: ['Action', 'Science Fiction'],
            };
        default:
            return state;
    }
}

const initialRecommendationState: Recommendations = {
    movieIds: [],
};

export function recommendationsReducer(state = initialRecommendationState, action: ActionTypes): {} {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                // This is where the API request would be made
                recommendations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            };
        default:
            return state;
    }
}
