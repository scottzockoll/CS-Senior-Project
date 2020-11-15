import React from 'react';
import { Button, Grommet, Header, Menu, Image, Box, Anchor, Nav, ResponsiveContext, TextInput } from 'grommet';
import en from '../../en.json';

function NavigationBar() {
    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
                <Box style={{ height: 57 }} margin={{ left: '.5%' }}>
                    <Button plain={true} label={<Image height="50" src="images/FlickPickSmall.png" />} href="/" />
                </Box>
                <Box margin={{ left: 'auto' }}>
                    <TextInput
                        placeholder="Movie search"
                        // value={value}
                        // onChange={event => setValue(event.target.value)}
                    />
                </Box>
                <ResponsiveContext.Consumer>
                    {(size) => (
                        <Box>
                            {size === 'large' && (
                                <Box margin={{ right: 'auto', left: 'auto' }}>
                                    <Nav direction="row" background="brand" margin={{ right: '15px' }}>
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp} />
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn} />
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.admin} href="/admin" />
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.client} href="/client" />
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.home} href="/" />
                                    </Nav>
                                </Box>
                            )}
                            {size === 'medium' && (
                                <Menu
                                    dropBackground="white"
                                    items={[
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin, href: '/admin' },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client, href: '/client' },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home, href: '/' },
                                    ]}
                                />
                            )}
                            {size === 'small' && (
                                <Menu
                                    dropBackground="white"
                                    items={[
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin, href: '/admin' },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client, href: '/client' },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home, href: '/' },
                                    ]}
                                />
                            )}
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Header>
        </Box>
    );
}

export default NavigationBar;
