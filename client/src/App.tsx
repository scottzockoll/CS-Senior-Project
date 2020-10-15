import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

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
