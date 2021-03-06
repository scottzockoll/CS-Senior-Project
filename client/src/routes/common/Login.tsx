import { Box, Button, Header } from 'grommet';
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
    const [count, setCount] = React.useState(0);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        getUsers(count + 50);
        setCount(count + 50);
    };

    return (
        <Box align={'center'} pad={{ top: 'large' }}>
            {user && (
                <Header>
                    Welcome {user.firstName} {user.lastName}
                    <Button onClick={handleClick}>Get New Users</Button>
                </Header>
            )}
            {!user && <Header>Welcome Guest</Header>}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
