import { Box, Button, Grid, Heading } from 'grommet';
import React from 'react';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import StarRating from '../common/star/StarRating';

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
                <Box height={'auto'} width={'large'}>
                    <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                        <Heading>Initial Survey</Heading>
                    </Box>
                    {numberOfChildren.map(() => {
                        return (
                            <Box direction={'row'}>
                                <Box flex={'grow'}>
                                    <SearchField />
                                </Box>
                                <Box pad={{ horizontal: 'xlarge' }}>
                                    <StarRating currentRating={0} numberOfStars={5} size={'medium'} />
                                </Box>
                            </Box>
                        );
                    })}
                    <Box width="35%" margin={{ top: 'medium', left: 'auto', right: 'auto' }}>
                        <Box>
                            <Button
                                primary
                                label="Submit Survey"
                                onClick={() => {
                                    toggleInitialSurveyModal(false);
                                }}
                            />
                        </Box>

                        <Box margin={{ top: '2%', bottom: '5%' }}>
                            <Button
                                label="Close"
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
