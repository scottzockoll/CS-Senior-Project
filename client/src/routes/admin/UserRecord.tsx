/**
 * Interface for a single user record.
 */
export interface UserRecord {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    registerDate: string;
    moviesWatched: number;
    visits: number;
    watchedMovies: WatchedMovie[];
}

/**
 * Interface for a single record of a Watched Movie.
 */
export interface WatchedMovie {
    title: String;
    genre: String;
    userRating: number;
}
