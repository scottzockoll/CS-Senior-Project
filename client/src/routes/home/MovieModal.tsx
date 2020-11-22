import { Box, Button, Heading } from 'grommet';
import React from 'react';
import { toggleMovieModal } from './actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';

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
                <Box height={'auto'} width={'large'}>
                    <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                        <Heading>Movie Modal</Heading>
                    </Box>

                    <Box width="35%" margin={{ top: 'medium', left: 'auto', right: 'auto' }}>
                        <Box>
                            <Button
                                primary
                                label="New Modal!"
                                onClick={() => {
                                    toggleMovieModal(false);
                                }}
                            />
                        </Box>

                        <Box margin={{ top: '2%', bottom: '5%' }}>
                            <Button
                                label="Close"
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
