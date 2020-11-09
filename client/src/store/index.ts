import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, combineReducers } from 'redux';
import { UserEntitiesActions, UserEntitiesTypes } from './user';
import { userAuthReducer, usersReducer, tokenReducer } from './user/reducers';

export type AppAction = UserEntitiesActions;

export type ActionType = UserEntitiesTypes;

/**
 * Alias for app-specific redux store dispatch function.
 */
export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
/**
 * Alias for app-specific thunk type.
 */
export type AppThunk = ThunkAction<void, RootState, unknown, AppAction>;

export enum AsyncActionStatus {
    Request = '@@REQUEST',
    Success = '@@SUCCESS',
    Failure = '@@FAILURE',
}

export interface RequestAsyncAction<T> extends Action<T> {
    status: AsyncActionStatus.Request;
}
export interface SuccessAsyncAction<T> extends Action<T> {
    status: AsyncActionStatus.Success;
}
export interface FailureAsyncAction<T> extends Action<T> {
    status: AsyncActionStatus.Failure;
}

// The store needs to be passed a single reducer. We can create this by calling combineReducers
export const rootReducer = combineReducers({
    activeUser: userAuthReducer,
    users: usersReducer,
    token: tokenReducer,
});

/**
 * Root of state object, contains typing for the entire state tree.
 */
export type RootState = ReturnType<typeof rootReducer>;
