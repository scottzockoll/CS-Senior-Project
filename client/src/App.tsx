import React from 'react';
import './App.css';
import { UserRecord } from './routes/admin/UserRecord';
import AdminPage from './routes/admin';

/**
 * Sample user records for the admin page
 */
const records: UserRecord[] = [
    {
        userId: 1,
        first: 'Mary',
        last: 'Burnham',
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
        first: 'John',
        last: 'Doe',
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
        first: ' Umang',
        last: 'Doshi',
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

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>React works!</p>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
