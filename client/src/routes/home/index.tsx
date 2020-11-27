import { Box, Button, Carousel, Heading, Image, Layer } from 'grommet';
import React, { CSSProperties } from 'react';
import { Survey } from '../common/Survey';
import en from '../../en.json';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    surveyVisible: state.surveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type HomepageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HomepageComponent: React.FC<HomepageProps> = ({ surveyVisible, toggleSurvey }) => {
    const imgStyle: CSSProperties = {
        display: 'block',
        maxHeight: '70vh',
        maxWidth: '60vh',
        width: 'auto',
        height: '70vh',
    };
    return (
        <Box background="light-3" style={{ height: '100vh' }}>
            <Heading>{en.UI_LABELS.welcomeToFlickPick}</Heading>
            <Box style={{ marginLeft: 'auto', marginRight: 'auto', overflow: 'show' }}>
                <Carousel play={2500}>
                    <Image fit={'cover'} src="images/movie1.jpg" style={imgStyle} />
                    <Image fit={'cover'} src="images/movie2.jpg" style={imgStyle} />
                    <Image fit={'cover'} src="images/movie3.jpg" style={imgStyle} />
                    <Image fit={'cover'} src="images/movie4.jpg" style={imgStyle} />
                    <Image fit={'cover'} src="images/movie5.jpg" style={imgStyle} />
                </Carousel>
                <Button
                    style={{ width: 300 }}
                    primary
                    margin={{ top: 'medium', left: 'auto', right: 'auto' }}
                    label={en.UI_LABELS.takeAMovieSurvey}
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
        </Box>
    );
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(HomepageComponent);
