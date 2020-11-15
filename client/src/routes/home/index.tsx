import { Box, Button, Carousel, Heading, Image, Layer } from 'grommet';
import React from 'react';
import InitialSurveyModal from './InitialSurveyModal';
import en from '../../en.json';
import { store } from '../../index';
import { toggleInitialSurveyModal } from './actions';
import { Login } from '../common/Login';

interface HomepageProperties {}

export default class Homepage extends React.Component<HomepageProperties> {
    constructor(props: HomepageProperties) {
        super(props);
    }

    render() {
        let { initialSurveyVisible } = store.getState();
        console.log('initialSurveyVisible var', initialSurveyVisible);
        // remove this before PR
        return (
            <Box background="light-3" height={'xxlarge'}>
                <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                    <Heading margin="large">{en.UI_LABELS.welcomeToFlickPick}</Heading>
                </Box>
                <Box margin={{ top: '20px', bottom: '20px' }}>
                    <Login />
                </Box>
                <Box margin={{ left: 'auto', right: 'auto', top: '-15px' }} height="40%" width="medium">
                    <Carousel fill play={5000}>
                        <Image fit={'cover'} src="images/movie1.jpg" />
                        <Image fit={'cover'} src="images/movie2.jpg" />
                        <Image fit={'cover'} src="images/movie3.jpg" />
                        <Image fit={'cover'} src="images/movie4.jpg" />
                        <Image fit={'cover'} src="images/movie5.jpg" />
                    </Carousel>
                    <Button
                        primary
                        margin={{ top: 'medium' }}
                        label={en.UI_LABELS.takeAMovieSurvey}
                        hoverIndicator
                        onClick={() => {
                            store.dispatch(toggleInitialSurveyModal(true));
                        }}
                    />
                </Box>
                {/* User Modal displayed when row is clicked */}
                {initialSurveyVisible && (
                    <Layer
                        onEsc={() => {
                            store.dispatch(toggleInitialSurveyModal());
                        }}
                        onClickOutside={() => {
                            store.dispatch(toggleInitialSurveyModal());
                        }}
                    >
                        <InitialSurveyModal />
                    </Layer>
                )}
            </Box>
        );
    }
}
