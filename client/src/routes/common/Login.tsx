import { Box, Button, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { requestUsers } from '../../store/user/actions';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUser: (id: number) => dispatch(requestUsers(id, 100)),
});

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedLogin: React.FC<LoginProps> = ({ user, getUser }) => {
    const [count, setCount] = React.useState(0);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        getUser(count + 50);
        setCount(count + 50);
    };

    return (
        <Box align={'center'} margin={{ top: '-50px' }}>
            {user && (
                <Header>
                    {`Welcome, ${user.firstName} ${user.lastName}`}
                    <Button onClick={handleClick}>Get New Users</Button>
                </Header>
            )}
            {!user && <Header>Welcome, Guest! Sign up or Login.</Header>}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
