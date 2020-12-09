import React from 'react';
import { Box, Button } from 'grommet';
import UserTable from './UserTable';
import { connect } from 'react-redux';
import { UserSearchBar } from './UserSearchBar';
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
        <Box>
            <Box direction={'row'} pad={'small'}>
                <Button secondary label={en.UI_LABELS.BUTTON_LABELS.downloadAll} onClick={() => downloadAllToCSV()} />
                <UserSearchBar />
            </Box>
            <UserTable />
        </Box>
    );
};

export const Admin = connect()(AdminPage);
