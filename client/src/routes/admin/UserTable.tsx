import React from 'react';
import { Box, DataTable, Layer, TextInput } from 'grommet';
import UserRecordModal from './UserRecordModal';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../store/user';
import en from '../../en.json';
import { requestUsers } from '../../store/user/actions';

interface UserTableState {
    showModal: boolean;
    offset: number;
}

const mapStateToProps = (state: RootState) => ({
    users: Object.values(state.users.entities),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (offset: number, limit: number) => {
        dispatch(requestUsers(offset, limit));
    },
});

type UserTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const PAGE_SIZE = 500;

/**
 * React Component for UseTable displaying all the records for each user.
 */
class UnconnectedUserTable extends React.Component<UserTableProps, UserTableState> {
    // Instance variables
    selectedUser: User; // The reference to the selected user record in the UserTable

    constructor(props: UserTableProps, state: RootState) {
        super(props);

        this.state = {
            showModal: false,
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
                {/*{this.props.users.length > 0 && (*/}
                <DataTable
                    columns={[
                        {
                            property: 'id',
                            header: en.UI_LABELS.userId,
                            primary: true,
                            sortable: true,
                        },
                        {
                            property: 'first_name',
                            header: en.UI_LABELS.firstName,
                            sortable: true,
                        },
                        {
                            property: 'last_name',
                            header: en.UI_LABELS.lastName,
                            sortable: true,
                        },
                        {
                            property: 'email',
                            header: en.UI_LABELS.email,
                            sortable: true,
                        },
                    ]}
                    data={this.props.users}
                    // onClickRow={(row) => {
                    //     // On click row, show modal and set the selected user
                    //     this.selectedUser = row.datum;
                    //     this.setState({
                    //         ...this.state,
                    //         showModal: true,
                    //     });
                    // }}
                    size="large"
                    sortable={true}
                    step={20}
                    background="light-2"
                    onMore={this.loadMore}
                />
                {/*)}*/}

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
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedUserTable);
