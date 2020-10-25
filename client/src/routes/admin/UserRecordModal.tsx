import { Box, DataTable, Grid, Heading, Text, Meter } from 'grommet';
import React from 'react';
import { UserRecord } from './UserRecord';
import en from '../../en.json';


interface UserRecordModalProps {
    userRecord: UserRecord;
}

/**
 * returns the User Record modal given the
 * corresponding UserRecord
 * @param userRecord
 */
export default class userRecordModal extends React.Component<UserRecordModalProps> {
    render() {
        return (
            <Box height={'large'} width={'large'}>
                <Heading alignSelf={'center'} level={'2'}>
                    {en.UI_LABELS.userRecord}
                </Heading>
                <hr style={{ width: '90%' }} />
                <Grid
                    rows={['xxxsmall', 'xxxsmall', 'xxxsmall', 'xxxsmall', 'xxxsmall', 'xxxsmall', 'xxxsmall']}
                    columns={['small', 'small']}
                    alignSelf={'center'}
                    areas={[
                        { name: 'firstLabel', start: [0, 0], end: [0, 0] },
                        { name: 'firstName', start: [1, 0], end: [1, 0] },
                        { name: 'lastLabel', start: [0, 1], end: [0, 1] },
                        { name: 'lastName', start: [1, 1], end: [1, 1] },
                        { name: 'emailLabel', start: [0, 2], end: [0, 2] },
                        { name: 'email', start: [1, 2], end: [1, 2] },
                        {
                            name: 'registerDateLabel',
                            start: [0, 3],
                            end: [0, 3],
                        },
                        { name: 'registerDate', start: [1, 3], end: [1, 3] },
                        {
                            name: 'moviesWatchedLabel',
                            start: [0, 4],
                            end: [0, 4],
                        },
                        { name: 'moviesWatched', start: [1, 4], end: [1, 4] },
                        { name: 'visitsLabel', start: [0, 5], end: [0, 5] },
                        { name: 'visits', start: [1, 5], end: [1, 5] },
                    ]}
                >
                    {/*User Information display*/}
                    <Text textAlign={'center'} gridArea={'firstLabel'} weight={'bold'}>

                        {en.UI_LABELS.firstName}

                    </Text>
                    <Text textAlign={'center'} gridArea={'firstName'}>
                        {this.props.userRecord.firstName}
                    </Text>

                    <Text textAlign={'center'} gridArea={'lastLabel'} weight={'bold'}>

                        {en.UI_LABELS.lastName}

                    </Text>
                    <Text textAlign={'center'} gridArea={'lastName'}>
                        {this.props.userRecord.lastName}
                    </Text>

                    <Text textAlign={'center'} gridArea={'emailLabel'} weight={'bold'}>

                        {en.UI_LABELS.email}

                    </Text>
                    <Text textAlign={'center'} gridArea={'email'}>
                        {this.props.userRecord.email}
                    </Text>

                    <Text textAlign={'center'} gridArea={'registerDateLabel'} weight={'bold'}>

                        {en.UI_LABELS.registerDate}

                    </Text>
                    <Text textAlign={'center'} gridArea={'registerDate'}>
                        {this.props.userRecord.registerDate}
                    </Text>

                    <Text textAlign={'center'} gridArea={'moviesWatchedLabel'} weight={'bold'}>

                        {en.UI_LABELS.moviesWatched}

                    </Text>
                    <Text textAlign={'center'} gridArea={'moviesWatched'}>
                        {this.props.userRecord.moviesWatched}
                    </Text>

                    <Text textAlign={'center'} gridArea={'visitsLabel'} weight={'bold'}>

                        {en.UI_LABELS.visits}

                    </Text>
                    <Text textAlign={'center'} gridArea={'visits'}>
                        {this.props.userRecord.visits}
                    </Text>
                </Grid>

                <hr style={{ width: '90%' }} />

                {/* Table containing the list of movies watched by the user*/}
                <Heading alignSelf={'center'} level={'3'} margin={'none'}>
                    {en.UI_LABELS.moviesWatched}
                </Heading>
                <Box background={'light-2'} style={{ width: '90%' }} alignSelf={'center'}>
                    <DataTable
                        columns={[
                            {
                                property: 'title',
                                header: en.UI_LABELS.title,
                                sortable: true,
                            },
                            {
                                property: 'genre',
                                header: en.UI_LABELS.genre,
                                sortable: true,
                            },
                            {
                                property: 'userRating',
                                header: en.UI_LABELS.userRating,
                                sortable: true,
                                render: (datum) => (
                                    <Box pad={{ vertical: 'xsmall' }}>
                                        <Meter
                                            background={'light-4'}
                                            values={[
                                                {
                                                    value: datum.userRating * 20,
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
                        data={this.props.userRecord.watchedMovies}
                        size={'medium'}
                    />
                </Box>
            </Box>
        );
    }
}
