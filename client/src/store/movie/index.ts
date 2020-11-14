export interface Movie {
    movieId: number;
    movieName: string;
    genres: Array<string>;
}

export const GET_MOVIE = 'GET_MOVIE';

export interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}
