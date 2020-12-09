import { Box, Button, Heading, Image, Layer } from 'grommet';
import React from 'react';
import { Survey } from '../common/Survey';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { MovieCarousel } from './MovieCarousel';

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
        <Box background="light-3" height={'100%'}>
            <Box margin={{ horizontal: 'auto' }} direction="row">
                <Heading margin={{ vertical: 'small' }}>{en.UI_LABELS.welcomeToFlickPick}</Heading>
            </Box>
            <Box margin={{ horizontal: 'auto', bottom: 'medium' }}>
                <Image width={'200px'} src={'images/FlickPickIcon.png'} alt={'FlickPick Logo'} />
            </Box>
            <Box margin={{ horizontal: 'auto' }}>
                <SearchField displayModal={true} />
            </Box>
            <Box pad={{ vertical: 'medium' }}>
                <MovieCarousel />
            </Box>
            <Box margin={{ horizontal: 'auto', top: 'auto', bottom: 'xlarge' }}>
                <Button
                    primary
                    margin={{ horizontal: 'auto' }}
                    label={en.UI_LABELS.BUTTON_LABELS.takeAMovieSurvey}
                    hoverIndicator
                    onClick={() => toggleSurvey(true)}
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
