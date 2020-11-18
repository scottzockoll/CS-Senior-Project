import React from 'react';
import { Box, DataTable, Text, Button, Layer, Select, Grommet } from 'grommet';
import { useSelector, useDispatch, connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { deleteUser, requestUsers } from '../../store/user/actions';

interface ClientPageState {
    showUpdateRating: boolean;
    showSignOut: boolean;
    showDeleteAccount: boolean;
    showResetMovies: boolean;
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUsers: (offset: number, limit: number) => {
        dispatch(requestUsers(offset, limit));
    },
    deleteUser: (id: number) => {
        dispatch(deleteUser(id));
    },
});

const mapStateToProps = (state: RootState) => ({
    activeUserId: state.activeUser,
    user: state.users.entities[state.activeUser], // TODO
});

type ClientPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class ClientPage extends React.Component<ClientPageProps, ClientPageState> {
    // retrieve the state of the store
    // const state = useSelector((state: any) => state);
    // const [showUpdateRating, setShowUpdateRating] = React.useState<boolean>();
    // const [showSignOut, setShowSignOut] = React.useState<boolean>();
    // const [showDeleteAccount, setShowDeleteAccount] = React.useState<boolean>();
    // const [showResetMovies, setShowResetMovies] = React.useState<boolean>();

    // const dispatch = useDispatch();
    //let user = state.users.entities[state.activeUser];

    constructor(props: ClientPageProps, state: RootState) {
        super(props);

        // retrieve the current user
        this.props.getUsers(this.props.activeUserId, 1);

        this.state = {
            showDeleteAccount: false,
            showResetMovies: false,
            showSignOut: false,
            showUpdateRating: false,
        };
    }

    render() {
        return (
            <Grommet>
                <Box pad="medium" align="start">
                    <Text>{en.UI_LABELS.fullName}:</Text>

                    <Text>{en.UI_LABELS.email}:</Text>
                </Box>
                <Box width="large" pad="medium">
                    <DataTable
                        border={true}
                        columns={[
                            { property: 'movieName', header: en.UI_LABELS.title, sortable: true },
                            { property: 'userRating', header: en.UI_LABELS.userRating, sortable: true },
                        ]}
                        sortable={true}
                        onClickRow={() => {
                            this.setState({
                                ...this.state,
                                showUpdateRating: true,
                            });
                        }}
                    />

                    {this.state.showUpdateRating && (
                        <Layer
                            onEsc={() => {
                                this.setState({
                                    ...this.state,
                                    showUpdateRating: false,
                                });
                            }}
                            onClickOutside={() => {
                                this.setState({
                                    ...this.state,
                                    showUpdateRating: false,
                                });
                            }}
                        >
                            <Box justify="center">
                                <Text alignSelf="center" size="xxlarge">
                                    {en.UI_LABELS.updateRating}
                                </Text>
                                <hr style={{ width: '95%' }} />
                            </Box>
                            <Box direction="row" justify="center">
                                {/*<Select*/}
                                {/*    options={['1', '2', '3', '4', '5']}*/}
                                {/*    value={value}*/}
                                {/*    // add update_rating change below*/}
                                {/*    onChange={({ option }) => setValue(option)}*/}
                                {/*/>*/}
                            </Box>
                            <Box direction="row" justify="center">
                                <Button
                                    label={en.UI_LABELS.confirm}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showUpdateRating: false,
                                        });
                                    }}
                                />
                                <Button
                                    label={en.UI_LABELS.cancel}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showUpdateRating: false,
                                        });
                                    }}
                                />
                            </Box>
                        </Layer>
                    )}
                </Box>
                <Box>
                    <Button
                        label={en.UI_LABELS.resetMovieSurvey}
                        fill={false}
                        alignSelf="start"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                showResetMovies: true,
                            });
                        }}
                    />
                    {this.state.showResetMovies && (
                        <Layer
                            onEsc={() => {
                                this.setState({
                                    ...this.state,
                                    showResetMovies: false,
                                });
                            }}
                            onClickOutside={() => {
                                this.setState({
                                    ...this.state,
                                    showResetMovies: false,
                                });
                            }}
                        >
                            <Box justify="center">
                                <Text alignSelf="center" size="xxlarge">
                                    {en.UI_LABELS.resetYourMovies}
                                </Text>
                                <hr style={{ width: '95%' }} />
                            </Box>
                            <Box direction="row" justify="center">
                                <Button
                                    label={en.UI_LABELS.yes}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showResetMovies: false,
                                        });
                                    }}
                                />
                                <Button
                                    label={en.UI_LABELS.no}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showResetMovies: false,
                                        });
                                    }}
                                />
                            </Box>
                        </Layer>
                    )}
                </Box>
                <Box direction="row" alignSelf="end" justify="end">
                    <Button
                        label={en.UI_LABELS.signOut}
                        fill={false}
                        alignSelf="end"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                showSignOut: true,
                            });
                        }}
                    />
                    {this.state.showSignOut && (
                        <Layer
                            onEsc={() => {
                                this.setState({
                                    ...this.state,
                                    showSignOut: false,
                                });
                            }}
                            onClickOutside={() => {
                                this.setState({
                                    ...this.state,
                                    showSignOut: false,
                                });
                            }}
                        >
                            <Box justify="center">
                                <Text alignSelf="center" size="xxlarge">
                                    {en.UI_LABELS.signOutQuestion}
                                </Text>
                                <hr style={{ width: '95%' }} />
                            </Box>
                            <Box direction="row" justify="center">
                                <Button
                                    label={en.UI_LABELS.yes}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showSignOut: false,
                                        });
                                    }}
                                />
                                <Button
                                    label={en.UI_LABELS.no}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showSignOut: false,
                                        });
                                    }}
                                />
                            </Box>
                        </Layer>
                    )}

                    <Button
                        label={en.UI_LABELS.deleteAccount}
                        fill={false}
                        alignSelf="end"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                showDeleteAccount: true,
                            });
                        }}
                    />
                    {this.state.showDeleteAccount && (
                        <Layer
                            onEsc={() => {
                                this.setState({
                                    ...this.state,
                                    showDeleteAccount: false,
                                });
                            }}
                            onClickOutside={() => {
                                this.setState({
                                    ...this.state,
                                    showDeleteAccount: true,
                                });
                            }}
                        >
                            <Box justify="center">
                                <Text alignSelf="center" size="xxlarge">
                                    {en.UI_LABELS.deleteYourAccount}
                                </Text>
                                <hr style={{ width: '95%' }} />
                            </Box>
                            <Box direction="row" justify="center">
                                <Button
                                    label={en.UI_LABELS.yes}
                                    onClick={() => {
                                        // dispatch he deleteUser action
                                        this.props.deleteUser(this.props.activeUserId);

                                        this.setState({
                                            ...this.state,
                                            showDeleteAccount: false,
                                        });
                                    }}
                                />
                                <Button
                                    label={en.UI_LABELS.no}
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            showDeleteAccount: false,
                                        });
                                    }}
                                />
                            </Box>
                        </Layer>
                    )}
                </Box>
            </Grommet>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
