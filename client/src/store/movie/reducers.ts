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
                    movie_Id: 109,
                    title: 'Wolf of Wall St.',
                    genres: ['Comedy'],
                    rating: 5,
                    tags: [],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    movie_Id: 110,
                    title: 'The Mandalorian',
                    genres: ['Action', 'Science Fiction'],
                    rating: 4,
                    tags: [],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    movie_Id: 111,
                    title: 'The Other Guys',
                    genres: ['Action', 'Comedy'],
                    rating: 2,
                    tags: [],
                },
            ];
        default:
            return state;
    }
}
