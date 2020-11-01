import { Box, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { requestSingleUser } from '../../store/user/actions';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (id: number) => dispatch(requestSingleUser(id)),
});

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedLogin: React.FC<LoginProps> = ({ user, getUsers }) => {
    return (
        <Box align={'center'} pad={{ top: 'large' }}>
            {user && (
                <Header>
                    Welcome {user.firstName} {user.lastName}
                </Header>
            )}
            {!user && <Header>Welcome Guest</Header>}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
