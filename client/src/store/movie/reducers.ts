import { AppAction, SEARCH_MOVIE } from '../index';
import {
    Movie,
    MovieEntitiesActions,
    MovieDeleteActions,
    UPDATE_MOVIE_RATING_STARTED,
    UPDATE_MOVIE_RATING_SUCCESS,
    DELETE_MOVIES_STARTED,
    DELETE_MOVIES_SUCCESS,
    DELETE_MOVIES_FAILURE,
} from './index';

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

// export function updateMovieRatingReducer(state = [], action: MovieEntitiesActions): string {
//     switch (action.type) {
//         case UPDATE_MOVIE_RATING_STARTED:
//             return action.rating;
//         case UPDATE_MOVIE_RATING_SUCCESS:
//             return action
//         default:
//             return "";
//     }
// }

export function deleteMoviesReducer(state = -1, action: MovieDeleteActions): number {
    switch (action.type) {
        case DELETE_MOVIES_STARTED:
            return action.id;
        case DELETE_MOVIES_SUCCESS:
            return action.id;
        case DELETE_MOVIES_FAILURE:
            return action.id;
        default:
            return state;
    }
}
