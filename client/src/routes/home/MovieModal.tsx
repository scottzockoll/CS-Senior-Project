import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import en from '../../en.json';
import { toggleMovieModal } from '../../store/home/actions';
import StarRating from '../common/StarRating';

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
                            <StarRating current={0} maximum={5} />
                        </Box>
                    </Box>
                    <Box direction={'row'} margin={{ top: 'large', horizontal: 'auto', bottom: 'medium' }}>
                        <Button
                            primary
                            margin={{ right: 'xsmall' }}
                            label={en.UI_LABELS.BUTTON_LABELS.rateIt}
                            onClick={() => {
                                toggleMovieModal(false);
                            }}
                        />
                        <Button
                            label={en.UI_LABELS.BUTTON_LABELS.close}
                            onClick={() => {
                                toggleMovieModal(false);
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export const MovieModal = connect(mapStateToProps, mapDispatchToProps)(MovieModalComponent);
