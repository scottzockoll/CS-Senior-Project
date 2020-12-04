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
        // mergeStrategy: (entityA, entityB) => handleMerge(entityA, entityB)
    }
);

export function handleMerge(entityA: any, entityB: any) {
    if (entityA.hasOwnProperty('name')) {
        if (entityA.movieId == entityB.movieId) {
            return {
                [entityA.movieId]: [entityA, entityB],
            };
        } else {
            return {
                [entityA.movieId]: {
                    ...entityA,
                },
                [entityB.movieId]: {
                    ...entityB,
                },
            };
        }
    } else {
        if (entityA.hasOwnProperty(entityB.movieId)) {
            if (Array.isArray(entityA[entityB.movieId])) {
                entityA[entityB.movieId].push(entityB);
                return entityA;
            } else {
                entityA[entityB.movieId] = [entityA[entityB.movieId], entityB];
                return entityA;
            }
        } else {
            entityA[entityB.movieId] = entityB;
            return entityA;
        }
    }
}

const movieSchema = new schema.Entity(
    'movies',
    {
        tags: [tagSchema],
    },
    {
        idAttribute: (movie) => movie.id,
        processStrategy: (movie, parent) => ({
            ...movie,
            parentId: parent.id,
        }),
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
