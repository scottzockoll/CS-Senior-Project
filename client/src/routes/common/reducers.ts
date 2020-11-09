import { AppAction, SEARCH_MOVIE } from '../../store';
import { Movie } from '../../store/movie';

const initialSearchMovieStates: Movie[] = [];

export function searchMovieReducer(state = initialSearchMovieStates, action: AppAction): Movie[] {
    switch (action.type) {
        case SEARCH_MOVIE:
            return [
                {
                    ...state,
                    // This is where the API request would be made
                    movieId: 109,
                    movieName: 'Wolf of Wall St.',
                    genres: ['Comedy'],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    movieId: 110,
                    movieName: 'The Mandalorian',
                    genres: ['Action', 'Science Fiction'],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    movieId: 111,
                    movieName: 'The Other Guys',
                    genres: ['Action', 'Comedy'],
                },
            ];
        default:
            return state;
    }
}
