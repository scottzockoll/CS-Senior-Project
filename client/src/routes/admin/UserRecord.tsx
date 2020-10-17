import React from 'react';

/**
 * Interface for a single user record.
 */
export interface UserRecord {
    userId: number;
    first: string;
    last: string;
    email: string;
    registerDate: string;
    moviesWatched: number;
    visits: number;
    watchedMovies: WatchedMovies[];
}

/**
 * Interface for a single record of a Watched Movie.
 */
interface WatchedMovies {
    title: String;
    genre: String;
    userRating: number;
}
