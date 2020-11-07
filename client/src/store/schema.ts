import { schema } from 'normalizr';

const userSchema = new schema.Entity(
    'users',
    {},
    {
        idAttribute: (user) => user.id,
    }
);

export const SCHEMAS = {
    USER: userSchema,
    USER_ARRAY: [userSchema],
};
