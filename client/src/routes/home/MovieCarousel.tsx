import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
import { title } from 'process';
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
                    {mockMovieTitles.map(function (title, index) {
                        return (
                            <Box margin={{ bottom: '12px' }}>
                                <h1 key={index}>{title}</h1>
                            </Box>
                        );
                    })}
                </Carousel>
            </Box>
        );
    }
}

export default MovieCarousel;
