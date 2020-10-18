import React from 'react';
import { Button, Grommet, Header, Menu, Image, Box } from 'grommet';

function NavigationBar() {
    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
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