import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { getUser, getMovie, getRecommendations } from './ActionCreators';
import { userReducer, movieReducer, recommendationsReducer } from './Reducers';

function App() {
    // The store needs to be passed a single reducer. We can create this
    // by calling combineReducers
    const rootReducer = combineReducers({
        user: userReducer,
        movie: movieReducer,
        recommendations: recommendationsReducer,
    });

    const store = createStore(rootReducer);

    // Print out the store showing default values
    console.log(store.getState());

    // Dispatch the getUser action to the store
    // This will end up changing the store's state and loaded a user
    store.dispatch(getUser(1));

    // Print out the store to show the user object
    console.log(store.getState());

    // Dispatch the getMovie action
    store.dispatch(getMovie(1));
    console.log(store.getState());

    // Dispatch the getRecommendations action
    store.dispatch(getRecommendations(1));
    console.log(store.getState());

    return (
        <Provider store={store}>
            <div className="App"></div>
        </Provider>
    );
}

export default App;
