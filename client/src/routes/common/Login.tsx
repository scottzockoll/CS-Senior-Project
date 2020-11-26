import { Box, Button, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../../store';
import {
    requestSingleUser,
    requestUsers,
    updateToken,
    userLogin,
    userLogout,
    requestAuthenticateUser,
} from '../../store/user/actions';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { API_ROOT } from '../../store/api';
import { User } from '../../store/user';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    // TODO: endpoint has not been implemented so the parameter is ignored for right now
    requestSingleUser: (id: number) => dispatch(requestSingleUser(id)),
    getUsers: (id: number, limit: number) => dispatch(requestUsers(id, limit)),
    userLogin: (id: number) => dispatch(userLogin(id)),
    userLogout: () => dispatch(userLogout()),
    requestAuthenticateUser: (email: string, tokenId: string) => dispatch(requestAuthenticateUser(email, tokenId)),
    updateToken: (token: string) => dispatch(updateToken(token)),
    userLoginAsync: (email: string, tokenId: string) => dispatch(userLoginAsync(email, tokenId)),
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

export const userLoginAsync = (email: string, authToken: string): AppThunk => async (dispatch: AppDispatch) => {
    let form_data = new FormData();
    form_data.append('auth_token', authToken);

    const userLoginPost = await fetch(`${API_ROOT}auth/${email}`, {
        method: 'POST',
        body: form_data,
    });

    const user: User = await userLoginPost.json();

    dispatch(userLogin(user.id));
    dispatch(updateToken(authToken));
    dispatch(requestSingleUser(user.id));
};

type LoginButtonProps = Omit<ReturnType<typeof mapDispatchToProps>, 'userLogout'>;
// @ts-ignore
function LoginButton({ userLoginAsync }) {
    const onSuccess = (res: any) => {
        refreshTokenSetup(res, requestAuthenticateUser);
        userLoginAsync(res.profileObj.email, res.tokenId);
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

const UnconnectedLogin: React.FC<LoginProps> = ({ user, getUsers, userLoginAsync, userLogout, updateToken }) => {
    const [count, setCount] = React.useState(0);

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        getUsers(count + 50, 30);
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
                    <LoginButton userLoginAsync={userLoginAsync} />
                </Header>
            )}
            {!user && <Header>Welcome, Guest! Sign up or Login.</Header>}
        </Box>
    );
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
