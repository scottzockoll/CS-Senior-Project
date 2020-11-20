import React from 'react';
import { Button, Header, Menu, Image, Box, Anchor, Nav, ResponsiveContext } from 'grommet';
import en from '../../en.json';
import { useHistory } from 'react-router-dom';
import { SearchField } from './SearchField';

function NavigationBar() {
    const history = useHistory();
    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
                <Box style={{ height: 48 }} margin={{ left: '.5%' }}>
                    <Button plain={true} label={<Image height="40" src="images/FlickPickSmall.png" />} href="/" />
                </Box>
                <Box style={{ width: 160 }} margin={{ left: 'auto' }}>
                    <SearchField />
                </Box>
                <ResponsiveContext.Consumer>
                    {(size) => (
                        <Box>
                            {size === 'large' && (
                                <Box margin={{ right: 'auto', left: 'auto' }}>
                                    <Nav direction="row" background="brand" margin={{ right: '15px' }}>
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp} />
                                        <Anchor label={en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn} />
                                        <Anchor
                                            label={en.UI_LABELS.NAVIGATION_BAR_LABELS.admin}
                                            onClick={() => history.push('/admin')}
                                        />
                                        <Anchor
                                            label={en.UI_LABELS.NAVIGATION_BAR_LABELS.client}
                                            onClick={() => history.push('/client')}
                                        />
                                        <Anchor
                                            label={en.UI_LABELS.NAVIGATION_BAR_LABELS.home}
                                            onClick={() => history.push('/')}
                                        />
                                    </Nav>
                                </Box>
                            )}
                            {size !== 'large' && (
                                <Menu
                                    dropBackground="white"
                                    items={[
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signUp },
                                        { label: en.UI_LABELS.NAVIGATION_BAR_LABELS.signIn },
                                        {
                                            label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin,
                                            onClick: () => history.push('/admin'),
                                        },
                                        {
                                            label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client,
                                            onClick: () => history.push('/client'),
                                        },
                                        {
                                            label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home,
                                            onClick: () => history.push('/'),
                                        },
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
