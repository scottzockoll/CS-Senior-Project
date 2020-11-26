import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { toggleInitialSurveyModal } from './actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import StarRating from '../common/star/StarRating';
import en from '../../en.json';

const mapStateToProps = (state: RootState) => ({
    initialSurveyVisible: state.initialSurveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleInitialSurveyModal: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type InitialSurveyProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const InitialSurveyComponent: React.FC<InitialSurveyProps> = ({ initialSurveyVisible, toggleInitialSurveyModal }) => {
    const numberOfChildren: number[] = [1, 2, 3, 4, 5];
    return (
        <Box>
            {initialSurveyVisible && (
                <Box height={'auto'} width={'large'} margin={{ right: '25px', left: '25px' }}>
                    <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                        <h1>{en.UI_LABELS.initialSurvey}</h1>
                    </Box>
                    <Box text-align="center" margin={{ bottom: '25px', right: '25px', left: '25px' }}>
                        <text>{en.UI_LABELS.initialSurveyInstructions}</text>
                    </Box>
                    {numberOfChildren.map(() => {
                        return (
                            <Box gap="none" width={'medium'} margin={{ left: '3%', bottom: '2%' }}>
                                <Box margin={{ bottom: '20px' }}>
                                    <SearchField />
                                </Box>
                                <Box margin={{ left: '550px', top: '-55px' }}>
                                    <StarRating currentRating={0} numberOfStars={5} size="medium" />
                                </Box>
                            </Box>
                        );
                    })}
                    <Box width="35%" margin={{ top: 'medium', left: 'auto', right: 'auto' }}>
                        <Box>
                            <Button
                                primary
                                label={en.UI_LABELS.BUTTON_LABELS.submitSurvey}
                                onClick={() => {
                                    toggleInitialSurveyModal(false);
                                }}
                            />
                        </Box>

                        <Box margin={{ top: '2%', bottom: '5%' }}>
                            <Button
                                label={en.UI_LABELS.BUTTON_LABELS.close}
                                onClick={() => {
                                    toggleInitialSurveyModal(false);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export const InitialSurvey = connect(mapStateToProps, mapDispatchToProps)(InitialSurveyComponent);
