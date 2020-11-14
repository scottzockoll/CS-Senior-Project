import { Paginated } from '../types';
import { DeleteActions, DELETE_USER_STARTED, DELETE_USER_FAILURE, DELETE_USER_SUCCESS } from './index';
import { User } from '../user/index';

const initialUserEntitiesState: Paginated<User> = {
    ids: [],
    entities: {},
    pages: [],
    prevPage: '',
    nextPage: '',
    isFetching: false,
};

export function deleteUsersReducer(state = initialUserEntitiesState, action: DeleteActions): Paginated<User> {
    switch (action.type) {
        case DELETE_USER_STARTED:
        // return {
        //     ...state,
        //     isFetching: true,
        // };
        case DELETE_USER_SUCCESS:
        // console.log(action);
        // if (action.id == 0) {
        //     return {
        //         ...state,
        //         ids: [...state.ids.slice(1)],
        //         entities: { ...state.entities.slice(1) },
        //     };
        // }
        // return {
        //     ...state,
        //     ids: [...state.ids, ...Object.values(action.response.entities.users).map((user) => user.id)],
        //     entities: {
        //         ...state.entities,
        //     },
        //     isFetching: false,
        // };
        case DELETE_USER_FAILURE:
        // return {
        //     ...state,
        //     isFetching: false,
        // };

        default:
            return state;
    }
}
