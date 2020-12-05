import { Box, Button, Layer, Text } from 'grommet';
import React from 'react';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import en from '../../en.json';
import { toggleMovieModal } from '../../store/home/actions';
import StarRating from '../common/StarRating';
import { updateMovieRating } from '../../store/movie/actions';

const mapStateToProps = (state: RootState) => ({
    show: state.movieModal.visible,
    movie: state.movies.entities[state.movieModal.movieId],
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleMovieModal: (isVisible: boolean) => dispatch(toggleMovieModal(isVisible)),
    updateMovieRating: (feedbackId: number, value: number) => dispatch(updateMovieRating(feedbackId, value)),
});

type MovieModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const MovieModalComponent: React.FC<MovieModalProps> = ({ show, movie, toggleMovieModal }) => {
    return (
        <React.Fragment>
            {show && (
                <Layer>
                    <Box>
                        <Box height={'auto'} width={'650px'}>
                            <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                                <h1>{en.UI_LABELS.movieInformation}</h1>
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.title}</h3>
                                <Text>{movie.title}</Text>
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.genre}</h3>
                                {/*<Text>{movie.genres.join(', ')}</Text>*/}
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.rating}</h3>
                                <Box margin={{ left: '120px', top: '-44px' }}>
                                    <StarRating
                                        current={movie.rating}
                                        maximum={5}
                                        onClick={(event, value) => {
                                            // TODO: This does nothing, waiting for Scott's Redux changes
                                            console.warn(`Updating rating for ${movie.title} -> ${value}`);
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box width="26%" margin={{ top: 'large', left: 'auto', right: 'auto' }}>
                                <Box margin={{ top: '2%', bottom: '5%' }}>
                                    <Button
                                        label={en.UI_LABELS.BUTTON_LABELS.close}
                                        onClick={() => toggleMovieModal(false)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Layer>
            )}
        </React.Fragment>
    );
};

export const MovieModal = connect(mapStateToProps, mapDispatchToProps)(MovieModalComponent);
