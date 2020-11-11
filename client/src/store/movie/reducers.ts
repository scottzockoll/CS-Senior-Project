import { GET_MOVIE, GetMovieAction, GetActions, Movie } from './index';
import { getMovie } from './actions';

const initState: Movie = {
    movieId: -1,
    movieName: '',
    genres: [],
};

export function getMovieReducer(state = initState, action: GetActions) {
    switch (action.type) {
        case GET_MOVIE:
            return action.movieId;
        default:
            return state;
    }
}
