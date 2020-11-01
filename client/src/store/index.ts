import { AnyAction, combineReducers } from 'redux';
import { userReducer } from './user';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const rootReducer = combineReducers({
    user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
