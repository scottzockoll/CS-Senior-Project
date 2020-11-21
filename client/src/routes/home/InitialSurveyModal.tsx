import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { toggleInitialSurveyModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { SearchField } from '../common/SearchField';
import StarRating from '../common/star/StarRating';

interface PassedProps {
    numMovies: number;
}

const mapStateToProps = (state: RootState) => ({
    initialSurveyVisible: state.initialSurveyVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleInitialSurveyModal: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
});

type InitialSurveyProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & PassedProps;

/**
 * Construct a list of movie search fields
 * @param props
 * @constructor
 */
const MovieSearchList = (props: { count: number }) => {
    let fields: JSX.Element[] = [];
    for (let i = 0; i < props.count; i++) {
        fields.push(
            <Box direction={'row'} key={i}>
                <Box flex={'grow'}>
                    <SearchField />
                </Box>
                <Box pad={{ horizontal: 'xlarge' }}>
                    <StarRating currentRating={0} numberOfStars={5} size={'medium'} />
                </Box>
            </Box>
        );
    }
    return <React.Fragment>{fields}</React.Fragment>;
};

const InitialSurveyComponent: React.FC<InitialSurveyProps> = ({
    initialSurveyVisible,
    toggleInitialSurveyModal,
    numMovies,
}) => {
    return (
        <Box>
            {initialSurveyVisible && (
                <Box height={'auto'} width={'large'}>
                    <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                        <Heading>Initial Survey</Heading>
                    </Box>

                    {/*<SurveyFields n={numMovies} />*/}
                    <MovieSearchList count={numMovies} />

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
