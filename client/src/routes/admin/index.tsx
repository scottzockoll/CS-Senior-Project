import React from 'react';
import { Box, Button, Grid } from 'grommet';
import UserTable from './UserTable';
import { useSelector } from 'react-redux';

/***
 * Exports all the user records to a CSV file. Redirects the
 * user to the location of the CSV file.
 *
 */
function downloadAllToCSV(userRecords: Object) {
    if (window.confirm('Download records to CSV?')) {
        // redirect to All Users csv file
        window.open('http://ec2-18-222-97-98.us-east-2.compute.amazonaws.com/Users/All_Users.csv');
    }
}

export default function AdminPage() {
    // retrieve the state of the store
    const state = useSelector((state: any) => state);
    return (
        <Grid
            rows={['xxsmall', 'large']}
            columns={['medium']}
            gap="small"
            margin={{ top: 'small', left: 'small', right: 'small' }}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'main', start: [0, 1], end: [1, 1] },
            ]}
        >
            <Box gridArea="header">
                <Button
                    secondary
                    label={'Download All'}
                    alignSelf={'start'}
                    onClick={() => {
                        downloadAllToCSV(state.user.userRecords);
                    }}
                />
            </Box>
            <Box gridArea="main" background="light-2">
                <UserTable users={state.users} />
            </Box>
        </Grid>
    );
}
