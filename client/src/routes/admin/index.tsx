import React from 'react';
import { Box, Button, Grid } from 'grommet';
import UserTable from './UserTable';
import { connect } from 'react-redux';
import en from '../../en.json';

/***
 * Exports all the user records to a CSV file. Redirects the
 * user to the location of the CSV file.
 *
 */
function downloadAllToCSV() {
    if (window.confirm('Download records to CSV?')) {
        // redirect to All Users csv file
        window.open('http://ec2-18-222-97-98.us-east-2.compute.amazonaws.com/Users/All_Users.csv');
    }
}

const AdminPage: React.FC = () => {
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
            <Box margin={{ top: '5px' }} gridArea="header">
                <Button
                    secondary
                    label={en.UI_LABELS.BUTTON_LABELS.downloadAll}
                    alignSelf={'start'}
                    onClick={() => {
                        downloadAllToCSV();
                    }}
                />
            </Box>
            <Box gridArea="main" background="light-2">
                <UserTable />
            </Box>
        </Grid>
    );
};

export const Admin = connect()(AdminPage);
