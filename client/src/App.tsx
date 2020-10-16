import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { getUser, getMovie, getRecommendations } from './ActionCreators';
import { userReducer, movieReducer, recommendationsReducer } from './Reducers';

function App() {
    const rootReducer = combineReducers({
        user: userReducer,
        movie: movieReducer,
        recommendations: recommendationsReducer,
    });

    const store = createStore(rootReducer);

    console.log(store.getState());
    store.dispatch(getUser(1));
    console.log(store.getState());
    store.dispatch(getMovie(1));
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
