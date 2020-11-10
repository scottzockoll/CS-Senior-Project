import React from 'react';
import { Box, DataTable, Layer } from 'grommet';
import UserRecordModal from './UserRecordModal';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../store/user';
import en from '../../en.json';
import { requestUsers } from '../../store/user/actions';

interface UserTableState {
    showModal: boolean;
    idOffset: number;
    count: number;
}

const mapStateToProps = (state: RootState) => ({
    users: state.users.entities,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (idOffset: number, limit: number) => {
        dispatch(requestUsers(idOffset, limit));
    },
});

type UserTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

/**
 * React Component for UseTable displaying all the records for each user.
 */
class UserTableComponent extends React.Component<UserTableProps, UserTableState> {
    // Instance variables
    selectedUser: User; // The reference to the selected user record in the UserTable

    constructor(props: UserTableProps, state: RootState) {
        super(props);

        // load users
        this.props.getUsers(1, 50);

        this.state = {
            showModal: false,
            idOffset: 1,
            count: 1,
            // users: {},
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

        // bind the load more function to the constructor
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore(event: any) {
        this.props.getUsers(this.state.idOffset, 50);
        this.setState({
            ...this.state,
            count: this.state.count + 50,
        });
        this.setState({
            ...this.state,
            idOffset: this.state.idOffset + 50,
        });
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
                    data={Object.values(this.props.users)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
