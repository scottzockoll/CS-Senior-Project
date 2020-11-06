import React from 'react';
import ClientPage from './routes/Client/index';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { getUser, getUsers, getMovie, getRecommendations } from './ActionCreators';
import { userReducer, usersReducer, movieReducer, recommendationsReducer } from './Reducers';
import Homepage from './routes/home/index';
import NavigationBar from './routes/common/NavigationBar';
import AdminPage from './routes/admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    // The store needs to be passed a single reducer. We can create this
    // by calling combineReducers
    const rootReducer = combineReducers({
        user: userReducer,
        users: usersReducer,
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

    // Dispatch the getUsers action to the store.
    store.dispatch(getUsers(0, 1000));

    // print out the store a display the list of users
    console.log(store.getState());

    // Dispatch the getMovie action
    store.dispatch(getMovie(1));
    console.log(store.getState());

    // Dispatch the getRecommendations action
    store.dispatch(getRecommendations(1));
    console.log(store.getState());

    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/admin">
                            <NavigationBar />
                            <AdminPage />
                        </Route>
                        <Route path="/client">
                            <NavigationBar />
                            {/*<ClientPage userRecord={sampleRecord} />*/}
                        </Route>
                        <Route path="/">
                            <NavigationBar />
                            <Homepage />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
