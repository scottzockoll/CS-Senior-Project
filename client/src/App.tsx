import React from 'react';
import ClientPage from './routes/Client/index';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { getUser, getMovie, getRecommendations } from './ActionCreators';
import { userReducer, movieReducer, recommendationsReducer } from './Reducers';
import Homepage from './routes/home/index';
import NavigationBar from './routes/common/NavigationBar';
import { UserRecord, WatchedMovie } from './routes/admin/UserRecord';
import AdminPage from './routes/admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Sample user records for the admin page
 */
const records: UserRecord[] = [
    {
        userId: 1,
        firstName: 'Mary',
        lastName: 'Burnham',
        email: 'burnham23@s.r.e',
        registerDate: '9/12/20',
        moviesWatched: 5,
        visits: 4,
        watchedMovies: [
            {
                title: 'Lord of the Rings: The Two Towers',
                genre: 'Adventure Fantasy',
                userRating: 5,
            },
            {
                title: 'Lord of the Rings: The Fellowship of the Ring',
                genre: 'Adventure Fantasy',
                userRating: 4,
            },
            {
                title: 'Lord of the Rings: The Return of the King',
                genre: 'Adventure Fantasy',
                userRating: 5,
            },
            {
                title: 'Lord of the Rings: The Fellowship of the Ring',
                genre: 'Adventure Fantasy',
                userRating: 4,
            },
            {
                title: 'Toy Story',
                genre: 'Animation',
                userRating: 5,
            },
            {
                title: 'Midsommar',
                genre: 'Horror/Drama',
                userRating: 4,
            },
            {
                title: 'Hereditary',
                genre: 'Horror/Drama',
                userRating: 3,
            },
            {
                title: 'The Adventures of Sharkboy and Lavagirl',
                genre: 'Family/Adventure',
                userRating: 2,
            },
        ],
    },
    {
        userId: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'doeJ71@s.r.e',
        registerDate: '9/12/20',
        moviesWatched: 2,
        visits: 1,
        watchedMovies: [
            {
                title: 'Lord of the Rings: The Fellowship of the Ring',
                genre: 'Adventure Fantasy',
                userRating: 4,
            },
            {
                title: 'Toy Story',
                genre: 'Animation',
                userRating: 5,
            },
            {
                title: 'Midsommar',
                genre: 'Horror/Drama',
                userRating: 4,
            },
        ],
    },
    {
        userId: 3,
        firstName: ' Umang',
        lastName: 'Doshi',
        email: 'doshiU22@s.r.e',
        registerDate: '9/14/20',
        moviesWatched: 3,
        visits: 2,
        watchedMovies: [
            {
                title: 'Hereditary',
                genre: 'Horror/Drama',
                userRating: 3,
            },
            {
                title: 'The Adventures of Sharkboy and Lavagirl',
                genre: 'Family/Adventure',
                userRating: 2,
            },
        ],
    },
];

let movieRecords: WatchedMovie[] = [
    {
        title: 'Avengers Endgame (2019)',
        genre: 'Action',
        userRating: 5,
    },
    {
        title: 'Goon (2011)',
        genre: 'Adventure',
        userRating: 3,
    },
    {
        title: 'Justice League (2017)',
        genre: 'Action',
        userRating: 3.5,
    },
];

const sampleRecord = records[0];

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
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/admin">
                            <NavigationBar />
                            <AdminPage userRecords={records} />
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
                </Router>
            </div>
        </Provider>
    );
}

export default App;
