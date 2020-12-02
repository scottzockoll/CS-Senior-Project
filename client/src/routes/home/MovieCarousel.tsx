import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';

class MovieCarousel extends React.Component {
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
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 1</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 2</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 3</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 4</h1>
                    </Box>
                    <Box margin={{ bottom: '12px' }}>
                        <h1>Title 5</h1>
                    </Box>
                </Carousel>
            </Box>
        );
    }
}

export default MovieCarousel;
