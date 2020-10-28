import React from 'react';
import { Box, Button, Grid } from 'grommet';
import { UserRecord } from './UserRecord';
import UserTable from './UserTable';
import { CSVParser } from '../common/CSVParser';

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
        // check if there are user records to download
        if (Object.keys(userRecords).length == 0) {
            alert('There are no users available to download data from.');
            return;
        }

        // retrieve an array of user records
        let recordsArray = Object.values(userRecords);

        // remove the watchedMovies children
        for (let i = 0; i < recordsArray.length; i++) {
            delete recordsArray[i].watchedMovies;
        }

        // retrieve the current datetime
        let date = new Date();
        let datetimeStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

        // export user records to csv
        CSVParser.exportToCsv('User_Records_' + datetimeStr + '.csv', recordsArray);
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
