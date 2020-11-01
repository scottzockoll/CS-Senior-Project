import { Middleware } from 'redux';
import { AppAction, RootState } from './index';

export const exampleMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: AppAction) => {
    // code here
};
