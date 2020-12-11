import { Box, Button, Text } from 'grommet';
import React from 'react';
import { toggleInitialSurveyModal, updateSurvey } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import en from '../../en.json';
import { createMovieRating } from '../../store/movie/actions';
import { RatedSearchField } from './RatedSearchField';

interface PassedProps {
    numMovies: number;
}
interface MappedMovie {
    movie: {
        id?: number;
        title?: string;
    };
    rating: number;
}

const mapStateToProps = (state: RootState) => ({
    user: state.users.entities[state.activeUser],
    surveyVisible: state.surveyVisible,
    surveyMovies: state.survey.map(
        (stored): MappedMovie => {
            return {
                movie: {
                    id: stored?.movieId,
                    title: stored?.title,
                },
                rating: stored?.rating ?? 0,
            };
        }
    ),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleSurvey: (isVisible: boolean) => dispatch(toggleInitialSurveyModal(isVisible)),
    updateSurvey: (index: number, movieId: number, title: string, rating: number) =>
        dispatch(updateSurvey(index, movieId, title, rating)),
    submitRatings: (userId: number, movies: MappedMovie[]) => {
        for (const mappedMovie of movies) {
            if (mappedMovie.movie && mappedMovie.movie.id) {
                dispatch(createMovieRating(userId, mappedMovie.movie.id, mappedMovie.rating));
            }
        }
    },
});

type SurveyProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & PassedProps;

class UnconnectedSurvey extends React.Component<SurveyProps> {
    getFields = () => {
        let fields: JSX.Element[] = [];
        for (let i = 0; i < this.props.numMovies; i++) {
            const surveyMovie = this.props.surveyMovies[i];

            const id = surveyMovie?.movie?.id ?? undefined;
            const title = surveyMovie?.movie?.title ?? undefined;
            const rating = surveyMovie?.rating ?? 0;

            fields.push(
                <RatedSearchField
                    key={i}
                    value={title}
                    id={id}
                    rating={rating}
                    onClick={(suggestion) => {
                        if (suggestion.movie && suggestion.movie.title && suggestion.movie.id) {
                            this.props.updateSurvey(i, suggestion.movie.id, suggestion.movie.title, suggestion.rating);
                        }
                    }}
                />
            );
        }
        return <React.Fragment>{fields}</React.Fragment>;
    };

    render() {
        const searchFields = this.getFields();
        return (
            <Box>
                {this.props.surveyVisible && (
                    <Box width={'large'} pad={{ horizontal: 'medium' }}>
                        <Box margin={{ left: 'auto', right: 'auto', bottom: '10px', top: '5px' }} direction="row">
                            <h1>{en.UI_LABELS.movieSurvey}</h1>
                        </Box>
                        <Box margin={{ bottom: '25px', top: '-10px', right: '25px', left: '25px' }}>
                            <Text textAlign="center">{en.UI_LABELS.movieSurveyInstructions}</Text>
                        </Box>

                        {searchFields}

                        <Box direction={'row'} margin={{ top: 'medium', horizontal: 'auto', bottom: 'medium' }}>
                            <Button
                                primary
                                margin={{ right: 'xsmall' }}
                                label={en.UI_LABELS.BUTTON_LABELS.submit}
                                onClick={() => {
                                    this.props.submitRatings(this.props.user.id, this.props.surveyMovies);
                                    this.props.toggleSurvey(false);
                                    window.location.reload(true);
                                }}
                            />
                            <Button
                                label={en.UI_LABELS.BUTTON_LABELS.cancel}
                                onClick={() => {
                                    this.props.toggleSurvey(false);
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
}

export const Survey = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSurvey);
