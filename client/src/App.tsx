import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { getUser, getUsers, getMovie, getRecommendations } from './ActionCreators';
import { userReducer, usersReducer, movieReducer, recommendationsReducer } from './Reducers';
import Homepage from './routes/home/index';
import NavigationBar from './routes/common/NavigationBar';
import AdminPage from './routes/admin';
import { Route, Switch } from 'react-router-dom';
import { records, sampleRecord } from './ExampleData';
import ClientPage from './routes/Client';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin">
                    <NavigationBar />
                    <AdminPage />
                </Route>
                <Route path="/client">
                    <NavigationBar />
                    <ClientPage userRecord={sampleRecord} />
                </Route>
                <Route path="/">
                    <NavigationBar />
                    <Homepage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
