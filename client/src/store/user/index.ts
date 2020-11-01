import { Movie } from '../movie';
import { Tag } from '../../Types';

export interface User {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    movies: Record<number, Movie>;
    tags: Record<number, Tag>;
    isFetching: boolean;
}

export const GET_USER = 'GET_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export interface GetUserAction {
    type: typeof GET_USER;
    userId: number;
}

export interface ReceiveUserAction {
    type: typeof RECEIVE_USER;
    userId: number;
    userData: object;
}
