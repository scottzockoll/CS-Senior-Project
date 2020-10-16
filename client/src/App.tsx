import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Types
interface Movie {
    movie_id: number;
    movie_name: string;
    genres: Array<string>;
}

interface Tag {
    id: number;
    name: string;
    movieId: number;
}

interface User {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    movies: Record<number, Movie>;
    tags: Record<number, Tag>;
}

interface State {
    user: User | {};
    movie: Movie | {};
}

const GET_USER = 'GET_USER';
const GET_MOVIE = 'GET_MOVIE';
const GET_FEEDBACK = 'GET_FEEDBACK';
const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';

// Actions
interface GetUserAction {
    type: typeof GET_USER;
    userId: number;
}

interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}

interface GetFeedbackAction {
    type: typeof GET_FEEDBACK;
    userId: number;
    movieId: number;
}

interface GetRecommendationAction {
    type: typeof GET_RECOMMENDATIONS;
    userId: number;
}

type ActionTypes = GetUserAction | GetMovieAction | GetFeedbackAction | GetRecommendationAction;

// Action creators
function getUser(userId: number): ActionTypes {
    return {
        type: GET_USER,
        userId: userId,
    };
}

function getMovie(movieId: number): ActionTypes {
    return {
        type: GET_MOVIE,
        movieId: movieId,
    };
}

function getFeedback(userId: number, movieId: number): ActionTypes {
    return {
        type: GET_FEEDBACK,
        userId: userId,
        movieId: movieId,
    };
}

function getRecommendations(userId: number): ActionTypes {
    return {
        type: GET_RECOMMENDATIONS,
        userId: userId,
    };
}

// Reducers
function userReducer(state = {}, action: ActionTypes): {} {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                // This is where the API request would be made
                user: { firstName: 'Scott', lastName: 'Zockoll' },
            };
        default:
            return state;
    }
}

function movieReducer(state = {}, action: ActionTypes): {} {
    switch (action.type) {
        case GET_MOVIE:
            return {
                ...state,
                // This is where the API request would be made
                movie: {
                    genres: ['Action', 'Science Fiction'],
                    movie_id: 1,
                    movie_name: 'Terminator',
                },
            };
        default:
            return state;
    }
}

function feedbackReducer(state = {}, action: ActionTypes): {} {
    switch (action.type) {
        case GET_FEEDBACK:
            return {
                ...state,
                id: 999,
                rating: 3.0,
                request: 'OK',
            };
        default:
            return state;
    }
}

function recommendationsReducer(state = {}, action: ActionTypes): {} {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            };
        default:
            return state;
    }
}

function App() {
    const rootReducer = combineReducers({
        user: userReducer,
        movie: movieReducer,
        feedback: feedbackReducer,
        recommendations: recommendationsReducer,
    });

    const store = createStore(rootReducer);

    console.log(store.getState());
    store.dispatch(getUser(1));
    console.log(store.getState());
    store.dispatch(getMovie(1));
    console.log(store.getState());
    store.dispatch(getFeedback(1, 1));
    console.log(store.getState());
    store.dispatch(getRecommendations(1));
    console.log(store.getState());

    return (
        <Provider store={store}>
            <div className="App"></div>
        </Provider>
    );
}

export default App;
