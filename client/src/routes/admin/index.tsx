import React from 'react';
import { Box, Button, Grid } from 'grommet';
import { UserRecord } from './UserRecord';
import UserTable from './UserTable';

interface AdminPageProps {
    userRecords: UserRecord[];
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
                {/*TODO implement download all button. Will be hanled in a different branch.*/}
                <Button secondary label={'Download All'} alignSelf={'start'} />
            </Box>
            <Box gridArea="main" background="light-2">
                <UserTable userRecords={props.userRecords} />
            </Box>
        </Grid>
    );
}
