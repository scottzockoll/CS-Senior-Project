import { Box, Button, Carousel, Heading, Layer } from 'grommet';
import React from 'react';
import { Survey } from '../common/Survey';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import { toggleInitialSurveyModal } from '../../store/home/actions';

const mapStateToProps = (state: RootState) => ({
    // TODO: Can we leverage the Redux state to get an array of titles?
    surveyVisible: state.surveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type HomepageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const HomepageComponent: React.FC<HomepageProps> = ({ surveyVisible, toggleSurvey }) => {
    return (
        <Box background="light-3" height={'xxlarge'}>
            <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                <Heading margin="large">{en.UI_LABELS.welcomeToFlickPick}</Heading>
            </Box>
            <Box style={{ width: 250 }} margin={{ left: 'auto', right: 'auto', top: '-40px' }} width="medium">
                <SearchField />
            </Box>
            <Box margin={{ left: 'auto', right: 'auto', top: '-15px' }} width="medium">
                <Carousel fill play={5000}>
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
        </Box>
    );
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(HomepageComponent);
