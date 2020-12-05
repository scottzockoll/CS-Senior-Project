import React from 'react';
import { Button, Header, Menu, Image, Box, Anchor, Nav, ResponsiveContext } from 'grommet';
import en from '../../en.json';
import { useHistory } from 'react-router-dom';
import LoginBox from './LoginBox';
import { RootState } from '../../store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    isAdmin: state.users.entities[state.activeUser]?.isAdmin,
});

type NavigationBarProps = ReturnType<typeof mapStateToProps>;

const NavigationBar: React.FC<NavigationBarProps> = (props: NavigationBarProps) => {
    const history = useHistory();

    return (
        <Box>
            <Header style={{ height: 60 }} background="brand">
                <Box style={{ height: 48 }} margin={{ left: '.5%' }}>
                    <Button
                        plain={true}
                        label={<Image height="40" src="images/FlickPickSmall.png" />}
                        onClick={() => history.push('/')}
                    />
                </Box>
                <Box margin={{ left: 'auto' }}>
                    <LoginBox />
                </Box>
                <ResponsiveContext.Consumer>
                    {(size) => (
                        <Box>
                            {size === 'large' && (
                                <Box margin={{ right: 'auto', left: 'auto' }}>
                                    <Nav direction="row" background="brand" margin={{ right: '15px' }}>
                                        {props.isAdmin === true && (
                                            <Anchor
                                                label={en.UI_LABELS.NAVIGATION_BAR_LABELS.admin}
                                                onClick={() => history.push('/admin')}
                                            />
                                        )}
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
                                    items={
                                        // Done this way to fix a weird error with propTypes in console
                                        props.isAdmin
                                            ? [
                                                  {
                                                      label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client,
                                                      onClick: () => history.push('/client'),
                                                  },
                                                  {
                                                      label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home,
                                                      onClick: () => history.push('/'),
                                                  },
                                                  {
                                                      label: en.UI_LABELS.NAVIGATION_BAR_LABELS.admin,
                                                      onClick: () => history.push('/admin'),
                                                  },
                                              ]
                                            : [
                                                  {
                                                      label: en.UI_LABELS.NAVIGATION_BAR_LABELS.client,
                                                      onClick: () => history.push('/client'),
                                                  },
                                                  {
                                                      label: en.UI_LABELS.NAVIGATION_BAR_LABELS.home,
                                                      onClick: () => history.push('/'),
                                                  },
                                              ]
                                    }
                                />
                            )}
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Header>
        </Box>
    );
};

export default connect(mapStateToProps)(NavigationBar);
