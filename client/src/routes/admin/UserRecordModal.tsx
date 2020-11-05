import { Box, DataTable, Grid, Heading, Text, Meter } from 'grommet';
import React from 'react';
import { User } from '../../Types';
import { UserRecord } from './UserRecord';
import en from '../../en.json';

interface UserRecordModalProps {
    user: User;
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
                                render: (datum) => {
                                    // retrieve the all the genres
                                    let genres: string = '';

                                    for (let i = 0; i < datum.genres.length; i++) {
                                        // add the seperator if there's more than one genre
                                        if (i > 0) genres += '/';
                                        genres += datum.genres[i];
                                    }

                                    return <Text>{genres}</Text>;
                                },
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
                        data={Object.values(this.props.user.watchedMovies)}
                        size={'medium'}
                    />
                </Box>
            </Box>
        );
    }
}
