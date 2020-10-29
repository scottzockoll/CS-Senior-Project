import React from 'react';
import { Button, Grommet, Header, Menu, Image, Box } from 'grommet';
import en from '../../en.json';

function NavigationBar() {
    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
                <Button plain={true} label="FlickPick" hoverIndicator />
                <Menu
                    dropBackground="white"
                    label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp}
                    items={[
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home, href: '/' },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin, href: '/admin' },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client, href: '/client' },
                    ]}
                />
            </Header>
        </Box>
    );
}

export default NavigationBar;
