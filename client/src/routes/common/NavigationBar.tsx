import React from 'react';
import { Button, Header, Menu, Box } from 'grommet';
import { Login } from './Login';

function NavigationBar() {
    return (
        <Box>
            <Login />
            <Header style={{ height: 60 }} background={{ color: 'brand' }}>
                <Button plain={true} label="FlickPick" hoverIndicator />
                <Menu
                    dropBackground="white"
                    label="Sign Up"
                    items={[
                        { label: 'Sign In' },
                        { label: 'Home', href: '/' },
                        { label: 'Admin', href: '/admin' },
                        { label: 'Client', href: '/client' },
                    ]}
                />
            </Header>
        </Box>
    );
}

export default NavigationBar;
