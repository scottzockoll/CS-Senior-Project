import { ActionType } from './index';

export function createAction<T extends ActionType>(type: T): () => { type: T } {
    return () => {
        return { type };
    };
}
export function createActionWithPayload<T extends ActionType, P>(type: T): (payload: P) => { type: T; payload: P } {
    return (payload: P) => {
        return {
            type,
            payload,
        };
    };
}
