import React from 'react';
import { Box, DataTable, Text, Button, Layer, Select, Grommet } from 'grommet';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { deleteUser, requestUsers, userLogout } from '../../store/user/actions';
import StarRating from '../common/star/StarRating';
import { updateMovieRating } from '../../store/movie/actions';
import { withRouter } from 'react-router-dom';

interface ClientPageState {
    showUpdateRating: boolean;
    showSignOut: boolean;
    showDeleteAccount: boolean;
    showResetMovies: boolean;
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUser: (offset: number) => {
        dispatch(requestUsers(offset, 1));
    },
    deleteUser: (id: number) => {
        dispatch(deleteUser(id));
    },
    userLogout: () => dispatch(userLogout()),
    updateMovieRating: (feedbackId: number, rating: number) => {
        dispatch(updateMovieRating(feedbackId, rating));
    },
});

const mapStateToProps = (state: RootState) => ({
    activeUserId: state.activeUser,
    user: state.users.entities[state.activeUser],
    movies: Object.values(state.movies.entities),
});

type ClientPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & { history: any; location: any };

class ClientPage extends React.Component<ClientPageProps, ClientPageState> {
    constructor(props: ClientPageProps, state: RootState) {
        super(props);

        this.state = {
            showDeleteAccount: false,
            showResetMovies: false,
            showSignOut: false,
            showUpdateRating: false,
        };
    }

    componentDidMount() {
        this.props.getUser(this.props.activeUserId);
    }

    render() {
        return (
            <Grommet>
                <Box pad="medium" align="start">
                    <Text>
                        {en.UI_LABELS.fullName}: {this.props.user ? this.props.user.firstName : ''}{' '}
                        {this.props.user ? this.props.user.lastName : ''}
                    </Text>

                    <Text>
                        {en.UI_LABELS.email}: {this.props.user ? this.props.user.email : ''}
                    </Text>
                </Box>
                <Box width="large" pad="medium">
                    <DataTable
                        border={true}
                        data={this.props.movies}
                        columns={[
                            { property: 'title', header: en.UI_LABELS.title, sortable: true },
                            {
                                property: 'rating',
                                header: en.UI_LABELS.userRating,
                                sortable: true,
                                render: (datum) => (
                                    <StarRating
                                        currentRating={datum.rating}
                                        numberOfStars={5}
                                        size={'medium'}
                                        onClick={() => {}}
                                    />
                                ),
                            },
                        ]}
                        sortable={true}
                    />
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
                                        // Sign out the user
                                        this.props.userLogout();

                                        this.setState({
                                            ...this.state,
                                            showSignOut: false,
                                        });

                                        // redirect the user back to the home page
                                        this.props.history.push('/');
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

                                        // return to the home page
                                        // history.push('/');
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientPage));
