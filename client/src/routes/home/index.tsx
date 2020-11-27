import { Box, Button, Carousel, Heading, Layer } from 'grommet';
import React from 'react';
import { Survey } from '../common/Survey';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import { MovieModal } from './MovieModal';
import { toggleInitialSurveyModal, toggleMovieModal } from '../../store/home/actions';

const mapStateToProps = (state: RootState) => ({
    surveyVisible: state.surveyVisible,
    movieModalVisible: state.movieModalVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
    toggleMovieModal: (isVisible: boolean) => dispatch(toggleMovieModal(isVisible)),
});

type HomepageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HomepageComponent: React.FC<HomepageProps> = ({
    toggleMovieModal,
    movieModalVisible,
    surveyVisible,
    toggleSurvey,
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
                        label={en.UI_LABELS.BUTTON_LABELS.go}
                        hoverIndicator
                        onClick={() => {
                            toggleMovieModal(true);
                        }}
                    />
                </Box>
            </Box>
            <Box margin={{ left: 'auto', right: 'auto', top: '-15px' }} width="medium">
                <Carousel
                    onClick={() => {
                        toggleMovieModal(true);
                    }}
                    fill
                    play={5000}
                >
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 1</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 2</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 3</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 4</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 5</h1>
                    </Box>
                </Carousel>
                <Button
                    style={{ width: 300 }}
                    primary
                    margin={{ top: 'medium', left: 'auto', right: 'auto' }}
                    label={en.UI_LABELS.BUTTON_LABELS.takeAMovieSurvey}
                    hoverIndicator
                    onClick={() => {
                        toggleSurvey(true);
                    }}
                />
            </Box>
            {/* User Modal displayed when row is clicked */}
            {surveyVisible && (
                <Layer
                    onEsc={() => {
                        toggleSurvey(false);
                    }}
                    onClickOutside={() => {
                        toggleSurvey(false);
                    }}
                >
                    <Survey numMovies={5} />
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
