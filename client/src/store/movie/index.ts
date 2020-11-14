import { Tag } from '../tag';

export interface Movie {
    movie_Id: number;
    title: string;
    genres: Record<number, string>;
    rating: number;
    tags: Record<number, Tag>;
}

export const GET_MOVIE = 'GET_MOVIE';

export interface GetMovieAction {
    type: typeof GET_MOVIE;
    movieId: number;
}
