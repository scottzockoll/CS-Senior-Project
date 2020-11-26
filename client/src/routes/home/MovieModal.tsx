import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { toggleMovieModal } from './actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import en from '../../en.json';
import StarRating from '../common/star/StarRating';

const mapStateToProps = (state: RootState) => ({
    movieModalVisible: state.movieModalVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleMovieModal: (isVisible: boolean) => dispatch(toggleMovieModal(isVisible)),
});

type MovieModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const MovieModalComponent: React.FC<MovieModalProps> = ({ movieModalVisible, toggleMovieModal }) => {
    return (
        <Box>
            {movieModalVisible && (
                <Box height={'auto'} width={'650px'}>
                    <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                        <h1>{en.UI_LABELS.movieInformation}</h1>
                    </Box>
                    <Box margin={{ left: '150px' }}>
                        <h3>Title:</h3>
                    </Box>
                    <Box margin={{ left: '150px' }}>
                        <h3>Genre:</h3>
                    </Box>
                    <Box margin={{ left: '150px' }}>
                        <h3>Rating:</h3>
                        <Box margin={{ left: '120px', top: '-44px' }}>
                            <StarRating currentRating={0} numberOfStars={5} size="medium" />
                        </Box>
                    </Box>
                    <Box width="26%" margin={{ top: 'large', left: 'auto', right: 'auto' }}>
                        <Box>
                            <Button
                                primary
                                label={en.UI_LABELS.BUTTON_LABELS.rateIt}
                                onClick={() => {
                                    toggleMovieModal(false);
                                }}
                            />
                        </Box>

                        <Box margin={{ top: '2%', bottom: '5%' }}>
                            <Button
                                label={en.UI_LABELS.BUTTON_LABELS.close}
                                onClick={() => {
                                    toggleMovieModal(false);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export const MovieModal = connect(mapStateToProps, mapDispatchToProps)(MovieModalComponent);
