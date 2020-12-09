import { Box, Button, Layer, Text } from 'grommet';
import React from 'react';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import en from '../../en.json';
import { toggleMovieModal } from '../../store/home/actions';
import StarRating from '../common/StarRating';
import { createMovieRating, requestMovie, updateMovieRating } from '../../store/movie/actions';
import { Rating } from '../../store/movie';
import { requestSingleUser } from '../../store/user/actions';

const mapStateToProps = (state: RootState) => {
    const activeUserId = state.activeUser;
    const user = state.users.entities[state.activeUser];
    const show = state.movieModal.visible;
    const movieId = state.movieModal.movieId;
    const movie = state.movies.entities[movieId];
    const fetching = state.movies.isFetching;

    let rating: Rating | undefined;
    if (state.activeUser !== -1) {
        if (state.ratings.entities.hasOwnProperty(state.activeUser)) {
            rating = state.ratings.entities[state.activeUser][state.movieModal.movieId];
        }
    }

    return { show, movie, user, rating, movieId, fetching, activeUserId };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleMovieModal: (isVisible: boolean) => dispatch(toggleMovieModal(isVisible)),
    updateMovieRating: (feedbackId: number, value: number) => dispatch(updateMovieRating(feedbackId, value)),
    createMovieRating: (userId: number, movieId: number, rating: number) =>
        dispatch(createMovieRating(userId, movieId, rating)),
    getMovie: (movieId: number) => dispatch(requestMovie(movieId)),
    getUser: (offset: number) => dispatch(requestSingleUser(offset)),
});

type MovieModalProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class MovieModalComponent extends React.Component<MovieModalProps> {
    componentDidUpdate(prevProps: Readonly<MovieModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (!this.props.show || this.props.movie || this.props.fetching) {
            return;
        }
        this.props.getMovie(this.props.movieId);
    }

    render() {
        const ratingValue = this.props.rating?.rating ?? 0;

        return (
            <React.Fragment>
                {this.props.show && (
                    <Layer>
                        <Box height={'auto'} width={'650px'}>
                            <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                                <h1>{en.UI_LABELS.movieInformation}</h1>
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.title}</h3>
                                <Text>{this.props.movie ? this.props.movie.title : en.UI_LABELS.loading}</Text>
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.genre}</h3>
                                <Text>
                                    {this.props.movie ? this.props.movie.genres.join(', ') : en.UI_LABELS.loading}
                                </Text>
                            </Box>
                            <Box margin={{ left: '150px' }}>
                                <h3>{en.UI_LABELS.rating}</h3>
                                <Box margin={{ left: '120px', top: '-44px' }}>
                                    <StarRating
                                        current={ratingValue}
                                        maximum={5}
                                        onClick={(event, value) => {
                                            if (!this.props.user || !this.props.movie) {
                                                return;
                                            }

                                            if (this.props.rating) {
                                                this.props.updateMovieRating(this.props.movie.id, value);
                                            } else {
                                                this.props.createMovieRating(
                                                    this.props.user.id,
                                                    this.props.movie.id,
                                                    value
                                                );
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box width="26%" margin={{ top: 'large', left: 'auto', right: 'auto' }}>
                                <Box margin={{ top: '2%', bottom: '5%' }}>
                                    <Button
                                        label={en.UI_LABELS.BUTTON_LABELS.close}
                                        onClick={() => this.props.toggleMovieModal(false)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Layer>
                )}
            </React.Fragment>
        );
    }
}

export const MovieModal = connect(mapStateToProps, mapDispatchToProps)(MovieModalComponent);
