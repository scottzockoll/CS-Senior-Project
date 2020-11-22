import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({});

type LoginBoxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class LoginBox extends React.Component<LoginBoxProps> {}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
