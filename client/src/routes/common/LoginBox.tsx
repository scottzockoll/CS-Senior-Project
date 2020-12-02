import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Box } from 'grommet';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
    clientId: state.googleClientId,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({});

type LoginBoxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class LoginBox extends React.Component<LoginBoxProps> {
    render() {
        return (
            <Box>
                {this.props.user && <LogoutButton clientId={this.props.clientId} user={this.props.user} />}
                {!this.props.user && <LoginButton clientId={this.props.clientId} />}
            </Box>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
