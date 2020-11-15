import { AppAction, SEARCH_MOVIE } from '../index';
import { Movie } from './index';

const initialSearchMovieStates: Movie[] = [];

export function searchMovieReducer(state = initialSearchMovieStates, action: AppAction): Movie[] {
    switch (action.type) {
        case SEARCH_MOVIE:
            return [
                {
                    ...state,
                    // This is where the API request would be made
                    // No it's not -- Andy
                    id: 109,
                    title: 'Wolf of Wall St.',
                    genres: ['Comedy'],
                    rating: 5,
                    tags: [],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    // No it's not -- Andy
                    id: 110,
                    title: 'The Mandalorian',
                    genres: ['Action', 'Science Fiction'],
                    rating: 4,
                    tags: [],
                },
                {
                    ...state,
                    // This is where the API request would be made
                    // No it's not -- Andy
                    id: 111,
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
