import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../Types';
import { combineReducers } from 'redux';
import { movieReducer, recommendationsReducer, userReducer } from '../Reducers';

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionTypes>;
export type AppThunk = ThunkAction<void, RootState, unknown, ActionTypes>;

// The store needs to be passed a single reducer. We can create this by calling combineReducers
export const rootReducer = combineReducers({
    user: userReducer,
    movie: movieReducer,
    recommendations: recommendationsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
