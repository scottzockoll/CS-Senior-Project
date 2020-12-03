import { schema } from 'normalizr';
import { isArray } from 'util';

const tagSchema = new schema.Entity(
    'tags',
    {},
    {
        idAttribute: (tag) => tag.id,
    }
);

export function handleMerge(entityA: any, entityB: any) {
    if (Array.isArray(entityA)) {
        entityA.push(Object.values(entityB));
        return entityA;
    } else {
        entityA = [Object.values(entityA)];
        entityA.push(Object.values(entityB));
        return entityA;
    }
}

const movieSchema = new schema.Entity(
    'movies',
    {
        tags: [tagSchema],
    },
    {
        idAttribute: (movie, parent) => parent.id,
        mergeStrategy: (entityA, entityB) => handleMerge(entityA, entityB),
        // processStrategy: (value, parent) =>
        // ({
        //     ...value,
        //     parentId: parent.id
        // })
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
