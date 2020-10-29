import { Box, Button, Carousel, Heading, Image, Layer } from 'grommet';
import React from 'react';
import InitialSurveyModal from './InitialSurveyModal';
import en from '../../en.json';

interface HomepageProperties {
    //
}

interface HomepageState {
    showInitialSurvey: boolean;
}

export default class Homepage extends React.Component<HomepageProperties, HomepageState> {
    constructor(props: HomepageProperties) {
        super(props);
        this.state = {
            showInitialSurvey: false,
        };
    }

    render() {
        return (
            <Box background="light-3" height={'xxlarge'}>
                <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                    <Heading margin="large">Welcome to FlickPick! </Heading>
                </Box>
                <Box margin={{ left: 'auto', right: 'auto' }} height="40%" width="medium">
                    <Carousel fill play={5000}>
                        <Image fit={'cover'} src="images/movie1.jpg" />
                        <Image fit={'cover'} src="images/movie2.jpg" />
                        <Image fit={'cover'} src="images/movie3.jpg" />
                    </Carousel>
                    <Button
                        primary
                        margin={{ top: 'medium' }}
                        label={en.UI_LABELS.takeAMovieSurvey}
                        hoverIndicator
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                showInitialSurvey: true,
                            });
                        }}
                    ></Button>
                </Box>
                {/* User Modal displayed when row is clicked */}
                {this.state.showInitialSurvey && (
                    <Layer
                        onEsc={() => {
                            this.setState({ showInitialSurvey: false });
                        }}
                        onClickOutside={() => {
                            this.setState({ showInitialSurvey: false });
                        }}
                    >
                        <InitialSurveyModal />
                    </Layer>
                )}
            </Box>
        );
    }
}
