import { schema } from 'normalizr';
import { isArray } from 'util';
import { Movie } from './movie';
import { User } from './user';

const tagSchema = new schema.Entity(
    'tags',
    {},
    {
        idAttribute: (tag, parent) => tag.id,
        processStrategy: (tag, parent) => ({
            ...tag,
            movieId: parent.id,
            userId: parent.parentId,
        }),
    }
);

const movieSchema = new schema.Entity(
    'movies',
    {
        tags: [tagSchema],
    },
    {
        idAttribute: (movie) => movie.id,
    }
);

const userSchema = new schema.Entity(
    'users',
    {
        movies: [movieSchema],
    },
    {
        idAttribute: (user) => user.id,
    }
);

const nullSchema = new schema.Entity('null', {});

export const SCHEMAS = {
    NULL: nullSchema,
    USER: userSchema,
    USER_ARRAY: [userSchema],
    MOVIE: movieSchema,
    MOVIE_ARRAY: [movieSchema],
    TAG: tagSchema,
    TAG_ARRAY: [tagSchema],
};
