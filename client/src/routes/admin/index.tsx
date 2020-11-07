import React from 'react';
import { Box, Button, Grid } from 'grommet';
import { UserRecord } from './UserRecord';
import UserTable from './UserTable';

interface AdminPageProps {
    userRecords: UserRecord[];
}

/***
 * Exports all the user records to a CSV file. This function will output a csv file
 * with the current date attached to the filename.
 *
 * @param userRecords The Object containing all the user records.
 */
function downloadAllToCSV(userRecords: Object) {
    if (window.confirm('Download records to CSV?')) {
        // redirect to All Users csv file
        window.open('http://ec2-18-222-97-98.us-east-2.compute.amazonaws.com/Users/All_Users.csv');
    }
}

export default function AdminPage(props: AdminPageProps) {
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
                        downloadAllToCSV(props.userRecords);
                    }}
                />
            </Box>
            <Box gridArea="main" background="light-2">
                <UserTable userRecords={props.userRecords} />
            </Box>
        </Grid>
    );
}
