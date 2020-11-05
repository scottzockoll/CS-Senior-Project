import React from 'react';
import { Box, Button, Grid } from 'grommet';
import { User } from '../../Types';
import UserTable from './UserTable';
import { useSelector } from 'react-redux';

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
                {/*TODO implement download all button. Will be hanled in a different branch.*/}
                <Button secondary label={'Download All'} alignSelf={'start'} />
            </Box>
            <Box gridArea="main" background="light-2">
                <UserTable users={state.users} />
            </Box>
        </Grid>
    );
}
