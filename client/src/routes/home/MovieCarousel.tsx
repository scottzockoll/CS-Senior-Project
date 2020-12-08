import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import { requestRecommendations } from '../../store/user/actions';

const mapStateToProps = (state: RootState) => {
    const activeUser = state.activeUser;
    const recommendations = state.recommendations;
    return { activeUser, recommendations };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    requestRecommendations: (id: number) => dispatch(requestRecommendations(id)),
});

type MovieCarouselProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class MovieCarouselComponent extends React.Component<MovieCarouselProps> {
    componentDidMount() {
        if (this.props.activeUser != -1) {
            this.props.requestRecommendations(this.props.activeUser);
        }
    }

    render() {
        const loggedIn = false;
        return (
            <Box>
                <Carousel
                    onClick={() => {
                        toggleMovieModal(true);
                    }}
                    fill
                    play={5000}
                    controls={'arrows'}
                >
                    {this.props.recommendations.map(function (title) {
                        return (
                            <Box margin={{ bottom: '12px' }}>
                                <h2>{title}</h2>
                            </Box>
                        );
                    })}
                </Carousel>
            </Box>
        );
    }
}

export const MovieCarousel = connect(mapStateToProps, mapDispatchToProps)(MovieCarouselComponent);
