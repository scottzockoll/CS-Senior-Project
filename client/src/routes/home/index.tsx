import { Box, Button, Carousel, Heading, Image, Layer } from 'grommet';
import React from 'react';
import { InitialSurvey } from './InitialSurveyModal';
import en from '../../en.json';
import { toggleInitialSurveyModal, toggleMovieModal } from './actions';
import { Login } from '../common/Login';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import { MovieModal } from './MovieModal';

const mapStateToProps = (state: RootState) => ({
    initialSurveyVisible: state.initialSurveyVisible,
    movieModalVisible: state.movieModalVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleInitialSurveyModal: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
    toggleMovieModal: (isVisible: boolean) => dispatch(toggleMovieModal(isVisible)),
});

type HomepageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HomepageComponent: React.FC<HomepageProps> = ({
    toggleMovieModal,
    movieModalVisible,
    initialSurveyVisible,
    toggleInitialSurveyModal,
}) => {
    return (
        <Box background="light-3" height={'xxlarge'}>
            <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                <Heading margin="large">{en.UI_LABELS.welcomeToFlickPick}</Heading>
            </Box>
            <Box style={{ width: 250 }} margin={{ left: 'auto', right: 'auto', top: '-40px' }} width="medium">
                <SearchField />
                <Box margin={{ left: '270px', top: '-40px', bottom: '50px' }}>
                    <Button
                        margin={{ left: 'auto' }}
                        label={en.UI_LABELS.NAVIGATION_BAR_LABELS.go}
                        hoverIndicator
                        onClick={() => {
                            // to do
                        }}
                    />
                </Box>
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
                    style={{ width: 300 }}
                    primary
                    margin={{ top: 'medium', left: 'auto', right: 'auto' }}
                    label={en.UI_LABELS.takeAMovieSurvey}
                    hoverIndicator
                    onClick={() => {
                        toggleInitialSurveyModal(true);
                    }}
                />

                <Button
                    style={{ width: 300 }}
                    margin={{ top: 'medium', left: 'auto', right: 'auto' }}
                    label={'Movie modal test btn'}
                    onClick={() => {
                        toggleMovieModal(true);
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
                    <InitialSurvey />
                </Layer>
            )}
            {movieModalVisible && (
                <Layer
                    onEsc={() => {
                        toggleMovieModal(false);
                    }}
                    onClickOutside={() => {
                        toggleMovieModal(false);
                    }}
                >
                    <MovieModal />
                </Layer>
            )}
        </Box>
    );
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(HomepageComponent);
