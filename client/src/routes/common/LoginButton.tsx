import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { userLogin } from '../../store/user/actions';
import { User } from '../../store/user';
import { GoogleLogin } from 'react-google-login';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    logout: (id: number) => dispatch(userLogin(id)),
});

type LoginButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        user: User;
        clientId: string;
    };

class LoginButton extends React.Component<LoginButtonProps> {
    render() {
        return (
            <GoogleLogin
                clientId={this.props.clientId}
                buttonText="Login"
                // onSuccess={onSuccess}
                // onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true} // TODO: should not be always true
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
