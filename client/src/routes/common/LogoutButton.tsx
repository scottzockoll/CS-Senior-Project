import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateToken, userLogout } from '../../store/user/actions';
import { User } from '../../store/user';
import { GoogleLogout } from 'react-google-login';

type LogoutButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        user: User;
        clientId: string;
    };

class LogoutButton extends React.Component<LogoutButtonProps> {
    render() {
        return (
            <GoogleLogout
                clientId={this.props.clientId}
                buttonText={`${this.props.user.firstName} (Logout)`}
                onLogoutSuccess={this.props.logout}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    logout: () => {
        dispatch(userLogout());
        dispatch(updateToken(null));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
