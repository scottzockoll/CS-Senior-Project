import { Tag } from '../tag';

export interface Movie {
    id: number;
    title: string;
    // genres: Record<number, string>;
    rating: number;
    tags: Record<number, Tag>;
}

export const GET_MOVIE = 'GET_MOVIE';
