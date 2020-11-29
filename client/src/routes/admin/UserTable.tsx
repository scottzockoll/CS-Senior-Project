import React from 'react';
import { DataTable, Layer } from 'grommet';
import { UserRecordModal } from './UserRecordModal';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../store/user';
import en from '../../en.json';
import { requestUsers, toggleUserModal } from '../../store/user/actions';

interface UserTableState {
    showUserModal: boolean;
    offset: number;
}

const mapStateToProps = (state: RootState) => ({
    users: Object.values(state.users.entities),
    showUserModal: state.showUserModal,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (idOffset: number, limit: number) => {
        dispatch(requestUsers(idOffset, limit));
    },
    toggleUserModal: (isVisible: boolean) => dispatch(toggleUserModal(isVisible)),
});

type UserTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const PAGE_SIZE = 100;

/**
 * React Component for UseTable displaying all the records for each user.
 */
class UserTableComponent extends React.Component<UserTableProps, UserTableState> {
    // Instance variables
    selectedUser: User; // The reference to the selected user record in the UserTable

    constructor(props: UserTableProps, state: UserTableState) {
        super(props);

        this.state = {
            showUserModal: false,
            offset: 1,
        };

        // initialize our instance variables
        this.selectedUser = {
            id: 0,
            isAdmin: false,
            email: '',
            firstName: '',
            lastName: '',
            movies: [],
            tags: [],
        };
    }

    componentDidMount() {
        this.props.getUsers(this.state.offset, PAGE_SIZE);
        this.setState({
            ...this.state,
            offset: this.state.offset + PAGE_SIZE,
        });
    }

    loadMore = () => {
        this.props.getUsers(this.state.offset, PAGE_SIZE);
        this.setState({
            ...this.state,
            offset: this.state.offset + PAGE_SIZE,
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.users.length > 0 && (
                    <DataTable
                        columns={[
                            {
                                property: 'id',
                                header: en.UI_LABELS.userId,
                                primary: true,
                                sortable: true,
                                search: true,
                            },
                            {
                                property: 'firstName',
                                header: en.UI_LABELS.firstName,
                                sortable: true,
                                search: true,
                            },
                            {
                                property: 'lastName',
                                header: en.UI_LABELS.lastName,
                                sortable: true,
                                search: true,
                            },
                            {
                                property: 'email',
                                header: en.UI_LABELS.email,
                                sortable: true,
                                search: true,
                            },
                        ]}
                        data={this.props.users}
                        onClickRow={(row) => {
                            // On click row, show modal and set the selected user
                            this.selectedUser = row.datum;
                            // this.setState({showUserModal: true});
                            this.props.toggleUserModal(true);
                        }}
                        size="large"
                        sortable={true}
                        step={50}
                        background="light-2"
                        onMore={this.loadMore}
                    />
                )}

                {/* User Modal displayed when row is clicked */}
                {this.props.showUserModal && (
                    <Layer
                        onEsc={() => {
                            this.props.toggleUserModal(false);
                        }}
                        onClickOutside={() => {
                            this.props.toggleUserModal(false);
                        }}
                    >
                        <UserRecordModal user={this.selectedUser} />
                    </Layer>
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
