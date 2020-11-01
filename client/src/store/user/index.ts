import { sleep, typedAction } from '../util';
import { AppThunk } from '../index';

const initialState: IUser = {
    id: -1,
    firstName: '',
    lastName: '',
};

export const USER_LOGIN_TYPE = '@@USER/LOGIN';
export const userLogin = (id: number) => {
    return typedAction(USER_LOGIN_TYPE, {
        id: id,
        firstName: 'Joe',
        lastName: 'Smith',
    });
};

export const tryLogin = (id: number): AppThunk => async (dispatch) => {
    await sleep(500);
    dispatch(userLogin(id));
};

export const USER_LOGOUT_TYPE = '@@USER/LOGOUT';
export const userLogout = () => {
    return typedAction(USER_LOGOUT_TYPE);
};

type UserAction = ReturnType<typeof userLogin | typeof userLogout>;

export function userReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case USER_LOGIN_TYPE:
            return {
                ...action.payload,
            };
        case USER_LOGOUT_TYPE:
            return initialState;
        default:
            return state;
    }
}
