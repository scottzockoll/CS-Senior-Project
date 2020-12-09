import React from 'react';
import { Box, Carousel, Text } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { requestRecommendations } from '../../store/user/actions';

const mapStateToProps = (state: RootState) => {
    const user = state.activeUser === -1 ? null : state.users.entities[state.activeUser];
    const recommendations = state.activeUser === -1 ? null : state.recommendations;

    return {
        user,
        recommendations,
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    toggleMovieModal: (show: boolean, movieId: number) => dispatch(toggleMovieModal(show, movieId)),
    requestRecommendations: (id: number) => dispatch(requestRecommendations(id)),
});

type MovieCarouselProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class MovieCarouselComponent extends React.Component<MovieCarouselProps> {
    componentDidMount() {
        if (this.props.user) {
            this.props.requestRecommendations(this.props.user.id);
        }
    }

    render() {
        return (
            <Box pad={{ vertical: 'large' }}>
                {this.props.user && this.props.recommendations && this.props.recommendations.isFetching && (
                    <Text>Loading your recommendations...</Text>
                )}
                {this.props.user && this.props.recommendations && !this.props.recommendations.isFetching && (
                    <Carousel controls={'arrows'}>
                        {this.props.recommendations.movies.map((movie) => {
                            return (
                                <Box
                                    key={movie.id}
                                    margin={{ horizontal: 'large' }}
                                    style={{ zIndex: 5 }}
                                    onClick={() => {
                                        console.warn('FUCK');
                                        this.props.toggleMovieModal(true, movie.id);
                                    }}
                                >
                                    <h2 style={{ margin: '0 0 0 0' }}>{movie.title}</h2>
                                    <Text>{movie.genres.join(', ')}</Text>
                                </Box>
                            );
                        })}
                    </Carousel>
                )}
            </Box>
        );
    }
}

export const MovieCarousel = connect(mapStateToProps, mapDispatchToProps)(MovieCarouselComponent);
