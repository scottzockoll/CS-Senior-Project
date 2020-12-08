import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
class MovieCarousel extends React.Component {
    render() {
        const mockMovieTitles = [
            'Ant-Man',
            '42 Hours',
            'The Wolf of Wall St.',
            'Spider-Man: Homecoming',
            'Saving Private Ryan',
            'Elf',
            'Christmas Vacation',
            'What Happened to Moday?',
            'Wedding Crashers',
            'Blackhawk Down',
            'Beverly Hills Cop',
            'Guardians of the Galaxy',
            'Scream',
            'Halloween',
            'Toy Story',
            'Cars',
            'Captain America: The First Avenger',
            'Avatar',
            'Deadpool',
            'The Sound of Music',
            'Freaky Friday',
            'Doctor Strange',
            'Star Wars: The Last Jedi',
            'Zootopia',
            'Finding Nemo',
        ];
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
                    {mockMovieTitles.map(function (title) {
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

export default MovieCarousel;
