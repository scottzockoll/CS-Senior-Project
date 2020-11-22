import { Box, Button, Carousel, Heading, Image, Layer } from 'grommet';
import React from 'react';
import { InitialSurvey } from './InitialSurveyModal';
import en from '../../en.json';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { Login } from '../common/Login';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    initialSurveyVisible: state.initialSurveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleInitialSurveyModal: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type HomepageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HomepageComponent: React.FC<HomepageProps> = ({ initialSurveyVisible, toggleInitialSurveyModal }) => {
    return (
        <Box background="light-3" height={'xxlarge'}>
            <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                <Heading margin="large">{en.UI_LABELS.welcomeToFlickPick}</Heading>
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
                    style={{ width: 300 }}
                    primary
                    margin={{ top: 'medium', left: 'auto', right: 'auto' }}
                    label={en.UI_LABELS.takeAMovieSurvey}
                    hoverIndicator
                    onClick={() => {
                        toggleInitialSurveyModal(true);
                    }}
                />
            </Box>
            {/* User Modal displayed when row is clicked */}
            {initialSurveyVisible && (
                <Layer
                    onEsc={() => {
                        toggleInitialSurveyModal(false);
                    }}
                    onClickOutside={() => {
                        toggleInitialSurveyModal(false);
                    }}
                >
                    <InitialSurvey numMovies={5} />
                </Layer>
            )}
        </Box>
    );
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(HomepageComponent);
