import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from './SearchField';
import StarRating from './StarRating';
import en from '../../en.json';

interface PassedProps {
    numMovies: number;
}

const mapStateToProps = (state: RootState) => ({
    surveyVisible: state.surveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type SurveyProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & PassedProps;

/**
 * Construct a list of movie search fields
 * @param props
 * @constructor
 */
const MovieSearchList = (props: { count: number }) => {
    let fields: JSX.Element[] = [];
    for (let i = 0; i < props.count; i++) {
        fields.push(
            <Box direction={'row'} key={i} pad={{ vertical: 'xxsmall' }}>
                <Box flex={'grow'}>
                    <SearchField />
                </Box>
                <Box pad={{ horizontal: 'xlarge' }}>
                    <StarRating current={0} maximum={5} />
                </Box>
            </Box>
        );
    }
    return <React.Fragment>{fields}</React.Fragment>;
};

const UnconnectedSurvey: React.FC<SurveyProps> = ({ surveyVisible, toggleSurvey, numMovies }) => {
    return (
        <Box>
            {surveyVisible && (
                <Box width={'large'} pad={{ horizontal: 'medium' }}>
                    <Box margin={{ left: 'auto', right: 'auto', bottom: '10px', top: '5px' }} direction="row">
                        <h1>{en.UI_LABELS.movieSurvey}</h1>
                    </Box>
                    <Box margin={{ bottom: '25px', top: '-10px', right: '25px', left: '25px' }}>
                        <text>{en.UI_LABELS.movieSurveyInstructions}</text>
                    </Box>

                    {/*<SurveyFields n={numMovies} />*/}
                    <MovieSearchList count={numMovies} />

                    <Box direction={'row'} margin={{ top: 'medium', horizontal: 'auto', bottom: 'medium' }}>
                        <Button
                            primary
                            margin={{ right: 'xsmall' }}
                            label={en.UI_LABELS.BUTTON_LABELS.submit}
                            onClick={() => {
                                toggleSurvey(false);
                            }}
                        />
                        <Button
                            label={en.UI_LABELS.BUTTON_LABELS.cancel}
                            onClick={() => {
                                toggleSurvey(false);
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export const Survey = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSurvey);
