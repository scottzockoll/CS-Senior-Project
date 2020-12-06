import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
import { Movie } from '../../store/movie';

interface CarouselProps {
    movies: Movie[];
}
interface CarouselState {
    movies: Movie[];
}

class MovieCarousel extends React.Component<CarouselState> {
    constructor(props: Readonly<CarouselProps>) {
        super(props);
        this.state = {
            movies: [],
        };
    }

    render() {
        return (
            <Box>
                <Carousel
                    onClick={() => {
                        toggleMovieModal(true);
                    }}
                    fill
                    play={5000}
                >
                    {this.state.movies.map((movie) => (
                        <Box margin={{ bottom: '12px' }}>
                            <h1>{movie.title}</h1>
                        </Box>
                    ))}

                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 5</h1>
                    </Box>
                </Carousel>
            </Box>
        );
    }
}

export default MovieCarousel;
