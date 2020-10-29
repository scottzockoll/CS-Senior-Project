import React from 'react';
import { Button, Grommet, Header, Menu, Image, Box, Anchor, Nav } from 'grommet';
import en from '../../en.json';

function NavigationBar() {
    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
                <Box margin={{ left: '1%' }}>
                    <Button plain={true} label="FlickPick" hoverIndicator href="/" />
                </Box>
                <Box margin={{ left: 'auto' }}>
                    <Nav direction="row" background="brand">
                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp} />
                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn} />
                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.admin} href="/admin" />
                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.client} href="/client" />
                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.home} href="/" />
                    </Nav>
                </Box>
                <Menu
                    dropBackground="white"
                    label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp}
                    items={[
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin, href: '/admin' },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client, href: '/client' },
                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home, href: '/' },
                    ]}
                />
            </Header>
        </Box>
    );
}

export default NavigationBar;
