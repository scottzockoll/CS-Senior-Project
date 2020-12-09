import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { requestRecommendations, requestSingleUser, updateToken, userLogin } from '../../store/user/actions';
import { User } from '../../store/user';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { API_ROOT } from '../../store/api';

const mapStateToProps = (state: RootState) => ({
    loading: state.users.isFetching,
});
type LoginButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        clientId: string;
        loading: boolean;
    };

class LoginButton extends React.Component<LoginButtonProps> {
    render() {
        return (
            <GoogleLogin
                clientId={this.props.clientId}
                buttonText={this.props.loading ? 'Logging you in...' : 'Login w/ Google'}
                onSuccess={this.props.login}
                cookiePolicy={'single_host_origin'}
                // TODO: should not be always true?
                isSignedIn={true}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const isOnlineLogin = (r: GoogleLoginResponse | GoogleLoginResponseOffline): r is GoogleLoginResponse => {
            return r.hasOwnProperty('tokenId');
        };

        if (isOnlineLogin(response)) {
            // Login was successful, notify the server and login
            const email = response.profileObj.email;
            const token = response.tokenId;

            const auth = async (email: string, token: string) => {
                let form_data = new FormData();
                form_data.append('auth_token', token);

                const userLoginPost = await fetch(`${API_ROOT}auth/${email}`, {
                    method: 'POST',
                    body: form_data,
                    credentials: 'include',
                });

                const user: User = await userLoginPost.json();

                dispatch(userLogin(user.id));
                dispatch(updateToken(token));
                dispatch(requestSingleUser(user.id));
                dispatch(requestRecommendations(user.id));
            };

            await auth(email, token);

            // TODO: Setup token refresh, must be tested - field names do not match
            // let time = (response.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
            //
            // const refreshToken = async () => {
            //     const refreshed = await response.reloadAuthResponse();
            //     time = (refreshed.expires_in || 3600 - 5 * 60) * 1000;
            //
            //     await auth(email, refreshed.id_token);
            //     updateToken(refreshed.id_token);
            //
            //     // Setup the other timer after the first one
            //     setTimeout(refreshToken, time);
            // };
            // setTimeout(refreshToken, time);
        } else {
            // TODO: Dispatch a "you are offline" action
            // dispatch(userOffline())
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
