import { Box, DataTable, Grid, Heading, Text, Meter, Button } from 'grommet';
import React from 'react';
import { User } from '../../store/user';
import { CSVParser } from '../common/CSVParser';
import en from '../../en.json';

interface UserRecordModalProps {
    user: User;
}

/***
 * Exports all of user's watched movie data to a CSV file.
 *
 * @param user
 */
function exportUserRecordToCSV(user: User) {
    const movies = Object.values(user.movies);

    // check if the user has at least one movie watched
    if (movies.length < 1) {
        alert('User has no data to export. Cancelling download.');
        return;
    }

    if (window.confirm('Download the selected user record to CSV?')) {
        movies.forEach(function (movie) {
            delete movie.tags;
        });

        // retrieve the current datetime
        let date = new Date();
        let datetimeStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

        // format the filename
        let filename = `${user.firstName}_${user.lastName}_${datetimeStr}.csv`;

        // export user records to csv
        CSVParser.exportToCsv(filename, movies);
    }
}

/**
 * returns the User Record modal given the
 * corresponding UserRecord
 * @param userRecord
 */
export default class userRecordModal extends React.Component<UserRecordModalProps> {
    render() {
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
                            },
                            {
                                property: 'genres',
                                header: en.UI_LABELS.genre,
                                sortable: true,
                                render: (datum) => {
                                    const genres = Object.values(datum.genres);
                                    return <Text>{genres.join('/')}</Text>;
                                },
                            },
                            {
                                property: 'rating',
                                header: en.UI_LABELS.userRating,
                                sortable: true,
                                render: (datum) => (
                                    <Box pad={{ vertical: 'xsmall' }}>
                                        <Meter
                                            background={'light-4'}
                                            values={[
                                                {
                                                    value: datum.rating * 20,
                                                },
                                            ]}
                                            thickness="small"
                                            size="small"
                                        />
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
                <Box width={'small'} margin={{ top: '10px', left: 'auto', right: 'auto', bottom: '5px' }}>
                    <Button
                        primary
                        label={'Download to CSV'}
                        onClick={() => {
                            exportUserRecordToCSV(this.props.user);
                        }}
                    />
                </Box>
            </Box>
        );
    }
}
