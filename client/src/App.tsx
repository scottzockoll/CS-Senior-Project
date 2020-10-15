import React from 'react';
import ClientPage from "./routes/Client/index";
import {UserRecord, WatchedMovie} from "./routes/Client/interfaces";
import './App.css';

let movieRecords: WatchedMovie[] = [
  {
    title: "Avengers Endgame (2019)",
    rating: 5,
  },
  {
    title: "Goon (2011)",
    rating: 3,
  },
  {
    title: "Justice League (2017)",
    rating: 3.5,
  },
];

const record: UserRecord =
  {
    firstName: "Jason",
    lastName: "Zogheb",
    email: "jz@fakeemail.com",
    watchedMovies: movieRecords,
  };


function App() {
    return (
        <div className="App">
            <ClientPage userRecord={record}/>
        </div>
    );
}

export default App;
