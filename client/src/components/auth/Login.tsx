import React from 'react';
import { AppDispatch, RootState } from '../../store';
import { tryLogin, userLogout } from '../../store/user';
import { connect } from 'react-redux';
import { Box, Button, Form } from 'grommet';

const mapStateToProps = (state: RootState) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        userLogout: () => dispatch(userLogout()),
        userLogin: (id: number) => dispatch(tryLogin(id)),
    };
};

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedLogin: React.FC<LoginProps> = ({ user, userLogin, userLogout }) => {
    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('LOGIN');

        if (user.id !== -1) {
            return;
        }

        userLogin(3); // Fetch from Google API or w/e
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('LOGOUT');

        if (user.id === -1) {
            return;
        }

        userLogout();
    };

    return (
        <Box align={'center'} pad={{ top: 'large' }}>
            <Form>
                <Button margin={{ horizontal: 'medium' }} onClick={handleLogin}>
                    Login
                </Button>
                <Button margin={{ horizontal: 'medium' }} onClick={handleLogout}>
                    Logout
                </Button>
            </Form>
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
