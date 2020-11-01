import { Box, Button, Form } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';

const UnconnectedLogin: React.FC = () => {
    return (
        <Box align={'center'} pad={{ top: 'large' }}>
            <Form>
                <Button margin={{ horizontal: 'medium' }}>Login</Button>
                <Button margin={{ horizontal: 'medium' }}>Logout</Button>
            </Form>
        </Box>
    );
};

export const Login = connect()(UnconnectedLogin);
