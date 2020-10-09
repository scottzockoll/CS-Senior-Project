import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

type Action =
    | {
          type: 'ADD';
      }
    | {
          type: 'REMOVE';
          message: string;
      };

interface Movie {
    id: number;
    name: string;
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

// Testing
export const message = (state = '', action: Action) => {
    switch (action.type) {
        case 'ADD':
            return 'Message';
        default:
            return state;
    }
};

// Testing
export const messages = (state = [], action: Action) => {
    switch (action.type) {
        case 'ADD': {
            return [...state, message('', action)];
        }
        case 'REMOVE': {
            return state.filter((message) => message !== action.message);
        }
        default:
            return state;
    }
};

function App() {
    const store = createStore(combineReducers({ messages }));

    console.log(store.getState());
    store.dispatch({
        type: 'ADD',
    });
    store.dispatch({
        type: 'REMOVE',
        message: 'Message',
    });
    console.log(store.getState());

    return (
        <Provider store={store}>
            <div className="App"></div>
        </Provider>
    );
}

export default App;
