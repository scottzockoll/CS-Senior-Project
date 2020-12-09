import { Box, DataTable, Grid, Heading, Text, Button } from 'grommet';
import React from 'react';
import { User } from '../../store/user';
import { AppDispatch, RootState } from '../../store';
import en from '../../en.json';
import StarRating from '../common/StarRating';
import { toggleUserModal } from '../../store/user/actions';
import { connect } from 'react-redux';
import { Movie, Rating } from '../../store/movie';
import { CSVParser } from '../common/CSVParser';

type UserRecordModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { user: User };

const mapStateToProps = (state: RootState) => ({
    showUserModal: state.showUserModal,
    movies: Object.values(state.movies.entities),
    getMovies: (userId: number) => {
        if (state.users.entities.hasOwnProperty(userId) && state.ratings.entities.hasOwnProperty(userId)) {
            return Object.values(state.ratings.entities[userId]).map((feedback) => ({
                ...state.movies.entities[feedback.movieId],
                ...feedback,
            }));
        } else {
            return [];
        }
    },
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleUserModal: (isVisible: boolean) => dispatch(toggleUserModal(isVisible)),
});

/**
 * returns the User Record modal given the
 * corresponding UserRecord
 * @param userRecord
 */
class UnconnectedUserRecordModal extends React.Component<UserRecordModalProps> {
    /***
     * Exports all of user's watched movie data to a CSV file.
     *
     * @param user
     */
    exportUserRecordToCSV(user: User) {
        const movies = Object.values(user.movies);

        // check if the user has at least one movie watched
        if (movies.length < 1) {
            alert('User has no data to export.');
            return;
        }

        if (window.confirm('Download the selected user record to CSV?')) {
            let movieData: any[] = [];
            for (let i = 0; i < movies.length; i++) {
                movieData.push(this.props.movies[i]);
            }

            // retrieve the current datetime
            let date = new Date();
            let datetimeStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

            // format the filename
            let filename = `${user.firstName}_${user.lastName}_${datetimeStr}.csv`;

            // export user records to csv
            CSVParser.exportToCsv(filename, movieData);
        }
    }

    render() {
        const movies = this.props.getMovies(this.props.user.id);
        return (
            <Box style={{ height: '80%' }} width={'large'}>
                <Heading alignSelf={'center'} level={'2'}>
                    {en.UI_LABELS.userRecord}
                </Heading>
                <hr style={{ width: '90%' }} />
                <Grid
                    rows={['xxxsmall', 'xxxsmall', 'xxxsmall']}
                    columns={['small', 'small']}
                    alignSelf={'center'}
                    areas={[
                        { name: 'firstLabel', start: [0, 0], end: [0, 0] },
                        { name: 'firstName', start: [1, 0], end: [1, 0] },
                        { name: 'lastLabel', start: [0, 1], end: [0, 1] },
                        { name: 'lastName', start: [1, 1], end: [1, 1] },
                        { name: 'emailLabel', start: [0, 2], end: [0, 2] },
                        { name: 'email', start: [1, 2], end: [1, 2] },
                    ]}
                >
                    {/*User Information display*/}
                    <Text textAlign={'center'} gridArea={'firstLabel'} weight={'bold'}>
                        {en.UI_LABELS.firstName}
                    </Text>
                    <Text textAlign={'center'} gridArea={'firstName'}>
                        {this.props.user.firstName}
                    </Text>
                    <Text textAlign={'center'} gridArea={'lastLabel'} weight={'bold'}>
                        {en.UI_LABELS.lastName}
                    </Text>
                    <Text textAlign={'center'} gridArea={'lastName'}>
                        {this.props.user.lastName}
                    </Text>
                    <Text textAlign={'center'} gridArea={'emailLabel'} weight={'bold'}>
                        {en.UI_LABELS.email}
                    </Text>
                    <Text textAlign={'center'} gridArea={'email'}>
                        {this.props.user.email}
                    </Text>
                </Grid>

                <hr style={{ width: '90%' }} />

                {/* Table containing the list of movies watched by the user*/}
                <Heading alignSelf={'center'} level={'3'} margin={'none'}>
                    {en.UI_LABELS.moviesWatched}
                </Heading>
                <Box background={'light-2'} style={{ width: '90%', height: '50%' }} alignSelf={'center'}>
                    <DataTable
                        columns={[
                            {
                                property: 'title',
                                header: en.UI_LABELS.title,
                                sortable: true,
                                render: (movieIndex) => (
                                    <React.Fragment>
                                        <Text>{this.props.movies[movieIndex].title}</Text>
                                    </React.Fragment>
                                ),
                            },
                            {
                                property: 'genres',
                                header: en.UI_LABELS.genre,
                                sortable: true,
                                render: (movieIndex) => {
                                    const genres = this.props.movies[movieIndex].genres;
                                    return <Text>{genres.join(' / ')}</Text>;
                                },
                            },
                            {
                                property: 'rating',
                                header: en.UI_LABELS.userRating,
                                sortable: true,
                                render: (movieIndex) => (
                                    <Box pad={{ vertical: 'xsmall' }}>
                                        <StarRating current={this.props.movies[movieIndex].rating} maximum={5} />
                                    </Box>
                                ),
                            },
                        ]}
                        sortable={true}
                        style={{ width: '100%' }}
                        data={Object.values(this.props.user.movies)}
                        size={'medium'}
                    />
                </Box>
                <Box direction={'row'} margin={{ top: 'medium', horizontal: 'auto', bottom: 'medium' }}>
                    <Button
                        primary
                        margin={{ right: 'xsmall' }}
                        label={en.UI_LABELS.BUTTON_LABELS.downloadToCsv}
                        onClick={() => {
                            this.exportUserRecordToCSV(this.props.user);
                        }}
                    />
                    <Button
                        label={en.UI_LABELS.BUTTON_LABELS.close}
                        onClick={() => {
                            this.props.toggleUserModal(false);
                        }}
                    />
                </Box>
            </Box>
        );
    }
}

export const UserRecordModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUserRecordModal);
