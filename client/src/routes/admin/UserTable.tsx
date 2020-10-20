import React from 'react';
import { Box, DataTable, Layer } from 'grommet';
import UserRecordModal from './UserRecordModal';
import { UserRecord } from './UserRecord';
import { messages } from './UserRecord.nls';

interface UserTableProps {
    /**
     * A list of UserRecords to be display in the UserTable.
     */
    userRecords: UserRecord[];
}

interface UserTableState {
    /**
     * triggers the UserRecordModal when set to true.
     */
    showModal: boolean;
}

/**
 * React Component for UseTable displaying all the records for each user.
 */
export default class UserTable extends React.Component<UserTableProps, UserTableState> {
    // Instance variables
    selectedUser: UserRecord; // The reference to the selected user record in the UserTable

    constructor(props: UserTableProps) {
        super(props);
        this.state = {
            showModal: false,
        };

        // initialize our instance variables
        this.selectedUser = {
            email: '',
            firstName: '',
            lastName: '',
            moviesWatched: 0,
            registerDate: '',
            userId: 0,
            visits: 0,
            watchedMovies: [],
        };
    }

    render() {
        return (
            <Box>
                <DataTable
                    columns={[
                        {
                            property: 'userId',
                            header: messages.userId,
                            primary: true,
                            sortable: true,
                            search: true,
                        },
                        {
                            property: 'firstName',
                            header: messages.firstName,
                            sortable: true,
                            search: true,
                        },
                        {
                            property: 'lastName',
                            header: messages.lastName,
                            sortable: true,
                            search: true,
                        },
                        {
                            property: 'email',
                            header: messages.email,
                            sortable: true,
                            search: true,
                        },
                        {
                            property: 'registerDate',
                            header: messages.registerDate,
                            sortable: true,
                            search: true,
                        },
                        {
                            property: 'moviesWatched',
                            header: messages.moviesWatched,
                            sortable: true,
                        },
                        {
                            property: 'visits',
                            header: messages.visits,
                            sortable: true,
                        },
                    ]}
                    data={this.props.userRecords}
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
                        <UserRecordModal userRecord={this.selectedUser} />
                    </Layer>
                )}
            </Box>
        );
    }
}
