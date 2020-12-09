import React from 'react';
import { Box, DataTable, Layer } from 'grommet';
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
    searchedUsers: Object.values(state.searchedUsers.entities),
    showUserModal: state.showUserModal,
    searching: state.searchingUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (offset: number, limit: number) => {
        dispatch(requestUsers(offset, limit));
    },
    toggleUserModal: (isVisible: boolean) => dispatch(toggleUserModal(isVisible)),
});

type UserTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const PAGE_SIZE = 100;

/**
 * React Component for UseTable displaying all the records for each user.
 */
class UnconnectedUserTable extends React.Component<UserTableProps, UserTableState> {
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
        // if the Admin is not searching, load more
        if (!this.props.searching) {
            this.props.getUsers(this.state.offset, PAGE_SIZE);
            this.setState({
                ...this.state,
                offset: this.state.offset + PAGE_SIZE,
            });
        }
    };

    render() {
        return (
            <Box overflow={{ vertical: 'scroll' }} height={{ max: 'large' }}>
                {this.props.users.length > 0 && (
                    <DataTable
                        pin={true}
                        columns={[
                            {
                                property: 'id',
                                header: en.UI_LABELS.userId,
                                primary: true,
                                sortable: true,
                            },
                            {
                                property: 'firstName',
                                header: en.UI_LABELS.firstName,
                                sortable: true,
                            },
                            {
                                property: 'lastName',
                                header: en.UI_LABELS.lastName,
                                sortable: true,
                            },
                            {
                                property: 'email',
                                header: en.UI_LABELS.email,
                                sortable: true,
                            },
                        ]}
                        data={this.props.searching ? this.props.searchedUsers : this.props.users}
                        onClickRow={(row) => {
                            // On click row, show modal and set the selected user
                            this.selectedUser = row.datum;
                            // this.setState({showUserModal: true});
                            this.props.toggleUserModal(true);
                        }}
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
            </Box>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedUserTable);
