import { Box, Button, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { requestSingleUser, updateToken, userLogin, userLogout } from '../../store/user/actions';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { store } from '../../index';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (id: number) => dispatch(requestSingleUser(id)),
});

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// Shouldn't store it like this
const clientId = '962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com';

export const refreshTokenSetup = (res: any) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        store.dispatch(updateToken(res.tokenId));

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
};

function LoginButton() {
    const onSuccess = (res: any) => {
        console.log('Login Success: currentUser:', res.profileObj);

        alert(`Logged in successfully welcome ${res.profileObj.name}`);
        refreshTokenSetup(res);
        console.log(res);
        store.dispatch(userLogin(1));
        store.dispatch(updateToken(res.tokenId));
    };

    const onFailure = (res: any) => {
        console.log('Login failed: res:', res);
        alert(`Failed to login`);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

function LogoutButton() {
    const onSuccess = () => {
        console.log('Logout was successful');
        alert('Logout was successful');
        store.dispatch(userLogout());
        store.dispatch(updateToken(''));
    };

    return (
        <div>
            <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess} />
        </div>
    );
}

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
                    <LogoutButton />
                </Header>
            )}
            {!user && (
                <Header>
                    Welcome Guest
                    <LoginButton />
                </Header>
            )}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
