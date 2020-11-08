import React from 'react';
import { Box, DataTable, Layer } from 'grommet';
import UserRecordModal from './UserRecordModal';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../store/user';
import en from '../../en.json';
import { requestUsers } from '../../store/user/actions';

interface UserTableProps {
    /**
     * A list of UserRecords to be display in the UserTable.
     */
    users: User[];
}

interface UserTableState {
    /**
     * triggers the UserRecordModal when set to true.
     */
    showModal: boolean;
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    loadMore: (idOffset: number, limit: number) => {
        dispatch(requestUsers(idOffset, limit));
    },
});

/**
 * React Component for UseTable displaying all the records for each user.
 */
export class UserTableComponent extends React.Component<UserTableProps, UserTableState> {
    // Instance variables
    selectedUser: User; // The reference to the selected user record in the UserTable

    constructor(props: UserTableProps) {
        super(props);
        this.state = {
            showModal: false,
        };

        // initialize our instance variables
        this.selectedUser = {
            id: 0,
            isAdmin: false,
            email: '',
            firstName: '',
            lastName: '',
            movies: [],
            ratings: [],
            tags: [],
        };
    }

    render() {
        return (
            <Box>
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
                    onMore={() => {}}
                    data={this.props.users}
                    onClickRow={(row) => {
                        // On click row, show modal and set the selected user
                        this.selectedUser = row.datum;
                        this.setState({
                            ...this.state,
                            showModal: true,
                        });
                    }}
                    sortable={true}
                    size={'large'}
                    background="light-2"
                />

                {/* User Modal displayed when row is clicked */}
                {this.state.showModal && (
                    <Layer
                        onEsc={() => {
                            this.setState({ showModal: false });
                        }}
                        onClickOutside={() => {
                            this.setState({ showModal: false });
                        }}
                    >
                        <UserRecordModal user={this.selectedUser} />
                    </Layer>
                )}
            </Box>
        );
    }
}

export default connect()(UserTableComponent);
