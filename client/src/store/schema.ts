import { schema } from 'normalizr';

const userSchema = new schema.Entity(
    'users',
    {},
    {
        idAttribute: (user) => user.id,
    }
);

const nullSchema = new schema.Entity('null', {});

export const SCHEMAS = {
    USER: userSchema,
    USER_ARRAY: [userSchema],
    NULL: nullSchema,
};
