import { Box, DataTable, Grid, Heading, Text, Meter } from 'grommet';
import React from 'react';
import { User } from '../../Types';

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
                    User Record
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
                        First
                    </Text>
                    <Text textAlign={'center'} gridArea={'firstName'}>
                        {this.props.user.firstName}
                    </Text>

                    <Text textAlign={'center'} gridArea={'lastLabel'} weight={'bold'}>
                        Last
                    </Text>
                    <Text textAlign={'center'} gridArea={'lastName'}>
                        {this.props.user.lastName}
                    </Text>

                    <Text textAlign={'center'} gridArea={'emailLabel'} weight={'bold'}>
                        Email
                    </Text>
                    <Text textAlign={'center'} gridArea={'email'}>
                        {this.props.user.email}
                    </Text>
                </Grid>

                <hr style={{ width: '90%' }} />

                {/* Table containing the list of movies watched by the user*/}
                <Heading alignSelf={'center'} level={'3'} margin={'none'}>
                    Movies Watched
                </Heading>
                <Box background={'light-2'} style={{ width: '90%' }} alignSelf={'center'}>
                    <DataTable
                        columns={[
                            {
                                property: 'movieName',
                                header: 'Title',
                                sortable: true,
                            },
                            {
                                property: 'genres',
                                header: 'Genre',
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
                                header: 'User Rating',
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
