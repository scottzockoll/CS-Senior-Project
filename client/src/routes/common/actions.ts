import { AppAction, SEARCH_MOVIE } from '../../store';

export function searchMovie(movieTitle: string): AppAction {
    return {
        type: SEARCH_MOVIE,
        title: movieTitle,
    };
}
