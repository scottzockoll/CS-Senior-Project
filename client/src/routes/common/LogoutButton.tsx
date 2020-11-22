import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { userLogout } from '../../store/user/actions';
import { User } from '../../store/user';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    logout: () => dispatch(userLogout()),
});

type LogoutButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        user: User;
        clientId: string;
    };

class LogoutButton extends React.Component<LogoutButtonProps> {
    render() {
        return <React.Fragment />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
