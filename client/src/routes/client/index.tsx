import React from 'react';
import { Box, DataTable, Text, Button } from 'grommet';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { deleteUser, requestSingleUser } from '../../store/user/actions';
import StarRating from '../common/StarRating';
import { updateMovieRating, deleteMovies } from '../../store/movie/actions';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { User } from '../../store/user';
import Confirmation from '../common/Confirmation';
import { Rating } from '../../store/movie';

interface ClientPageState {
    showDeleteAccount: boolean;
    showResetMovies: boolean;
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUser: (offset: number) => dispatch(requestSingleUser(offset)),
    deleteUser: (id: number) => dispatch(deleteUser(id)),
    updateMovieRating: (feedbackId: number, rating: number) => dispatch(updateMovieRating(feedbackId, rating)),
    deleteMovies: (id: number) => dispatch(deleteMovies(id)),
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

const mapStateToProps = (state: RootState) => ({
    activeUserId: state.activeUser,
    user: state.users.entities[state.activeUser],
    movies: (() => {
        if (state.activeUser === -1) {
            return [];
        } else if (
            state.users.entities.hasOwnProperty(state.activeUser) &&
            Object.keys(state.ratings.entities).length !== 0
        ) {
            return Object.values(state.ratings.entities[state.activeUser]).map((feedback) => ({
                ...state.movies.entities[feedback.movieId],
                ...feedback,
            }));
        }
    })(),
    surveyVisible: state.surveyVisible,
});

type ClientPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

const ClientHeader = (props: { user: User }) => {
    return (
        <Box pad={{ vertical: 'medium' }} align="start">
            <Text>
                {en.UI_LABELS.fullName}: {props.user ? props.user.firstName : ''}{' '}
                {props.user ? props.user.lastName : ''}
            </Text>

            <Text>
                {en.UI_LABELS.email}: {props.user ? props.user.email : ''}
            </Text>
        </Box>
    );
};

class ClientPage extends React.Component<ClientPageProps, ClientPageState> {
    componentDidMount() {
        this.props.getUser(this.props.activeUserId);
    }

    constructor(props: ClientPageProps, state: RootState) {
        super(props);

        this.state = {
            showDeleteAccount: false,
            showResetMovies: false,
        };
    }

    hideReset = () => {
        this.setState({
            ...this.state,
            showResetMovies: false,
        });
    };

    showReset = () => {
        this.setState({
            ...this.state,
            showResetMovies: true,
        });
    };

    hideDelete = () => {
        this.setState({
            ...this.state,
            showDeleteAccount: false,
        });
    };

    showDelete = () => {
        this.setState({
            ...this.state,
            showDeleteAccount: true,
        });
    };

    render() {
        return (
            <Box pad={{ horizontal: 'medium' }}>
                <ClientHeader user={this.props.user} />
                <DataTable
                    border={true}
                    data={this.props.movies}
                    columns={[
                        { property: 'title', header: en.UI_LABELS.title, sortable: true },
                        {
                            property: 'rating',
                            header: en.UI_LABELS.userRating,
                            sortable: true,
                            render: (rating: Rating) => (
                                <StarRating
                                    current={rating.rating ?? 0}
                                    maximum={5}
                                    onClick={(event, value) => {
                                        this.props.updateMovieRating(rating.feedbackId, value);
                                    }}
                                />
                            ),
                        },
                    ]}
                    sort={{
                        property: 'title',
                        direction: 'asc',
                    }}
                    sortable={true}
                />
                <Box direction={'row'} margin={{ top: 'medium' }}>
                    <Button
                        margin={{ right: 'xsmall' }}
                        label={en.UI_LABELS.resetMovieSurvey}
                        onClick={this.showReset}
                    />
                    <Button
                        primary
                        color={'status-critical'}
                        label={en.UI_LABELS.deleteAccount}
                        onClick={this.showDelete}
                    />
                </Box>

                {this.state.showResetMovies && (
                    <Confirmation
                        header={en.UI_LABELS.resetYourMovies}
                        body={en.UI_LABELS.resetYourMoviesConfirmation}
                        onConfirm={() => {
                            this.props.deleteMovies(this.props.activeUserId);
                            this.hideReset();
                            toggleInitialSurveyModal(true);
                        }}
                        onCancel={this.hideReset}
                    />
                )}

                {this.state.showDeleteAccount && (
                    <Confirmation
                        header={en.UI_LABELS.deleteYourAccount}
                        body={en.UI_LABELS.deleteYourAccountConfirmation}
                        onConfirm={() => {
                            // dispatch he deleteUser action
                            this.props.deleteUser(this.props.activeUserId);

                            this.hideDelete();

                            // redirect the user back to the home page
                            this.props.history.push('/');
                        }}
                        onCancel={this.hideDelete}
                    />
                )}
            </Box>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientPage));
