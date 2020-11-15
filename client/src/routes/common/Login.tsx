import { Box, Button, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { requestUsers, updateToken, userLogin, userLogout, requestAuthenticateUser } from '../../store/user/actions';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    // TODO: endpoint has not been implemented so the parameter is ignored for right now
    getUsers: (id: number) => dispatch(requestUsers(id, 1)),
    userLogin: (id: number) => dispatch(userLogin(id)),
    userLogout: () => dispatch(userLogout()),
    requestAuthenticateUser: (email: string, tokenId: string) => dispatch(requestAuthenticateUser(email, tokenId)),
    updateToken: (token: string) => dispatch(updateToken(token)),
});

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// What is the proper way to store this?
const clientId = '962049608735-md7079ef0ghdld3rq8cda06gticrp2p8.apps.googleusercontent.com';

export const refreshTokenSetup = (res: any, authFunc: Function) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        authFunc(res.profileObj.email, res.tokenId);
        updateToken(res.tokenId);

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
};

type LoginButtonProps = Omit<ReturnType<typeof mapDispatchToProps>, 'userLogout'>;
function LoginButton({ getUsers, userLogin, requestAuthenticateUser, updateToken }: LoginButtonProps) {
    const onSuccess = (res: any) => {
        refreshTokenSetup(res, requestAuthenticateUser);
        requestAuthenticateUser(res.profileObj.email, res.tokenId);
        // TODO: need to get valid id from server
        userLogin(614);
        getUsers(614);
        updateToken(res.tokenId);
    };

    const onFailure = (res: any) => {
        console.log('Login failed: res:', res);
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

type LogoutButtonProps = Pick<ReturnType<typeof mapDispatchToProps>, 'userLogout' | 'updateToken'>;
function LogoutButton({ userLogout, updateToken }: LogoutButtonProps) {
    const onSuccess = () => {
        userLogout();
        updateToken('');
    };

    return (
        <div>
            <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess} />
        </div>
    );
}

const UnconnectedLogin: React.FC<LoginProps> = ({
    user,
    getUsers,
    userLogin,
    userLogout,
    requestAuthenticateUser,
    updateToken,
}) => {
    const [count, setCount] = React.useState(0);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        getUsers(count + 50);
        setCount(count + 50);
    };

    return (
        <Box align={'center'} margin={{ top: '-50px' }}>
            {user && (
                <Header>
                    {`Welcome, ${user.firstName} ${user.lastName}`}
                    <Button onClick={handleClick}>Get New Users</Button>
                    <LogoutButton userLogout={userLogout} updateToken={updateToken} />
                </Header>
            )}
            {!user && (
                <Header>
                    Welcome Guest
                    <LoginButton
                        getUsers={getUsers}
                        userLogin={userLogin}
                        requestAuthenticateUser={requestAuthenticateUser}
                        updateToken={updateToken}
                    />
                </Header>
            )}
            {!user && <Header>Welcome, Guest! Sign up or Login.</Header>}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
