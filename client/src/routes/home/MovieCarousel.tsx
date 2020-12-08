import React from 'react';
import { Box, Carousel } from 'grommet';
import { toggleMovieModal } from '../../store/home/actions';
import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    const activeUser = state.activeUser;
    return { activeUser };
};

type MovieCarouselProps = ReturnType<typeof mapStateToProps>;
class MovieCarouselComponent extends React.Component<MovieCarouselProps> {
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
                    {this.props.activeUser == -1 ? (
                        mockMovieTitles.map(function (title) {
                            return (
                                <Box margin={{ bottom: '12px' }}>
                                    <h2>{title}</h2>
                                </Box>
                            );
                        })
                    ) : (
                        <Box>Recommendations endpoint</Box>
                    )}
                </Carousel>
            </Box>
        );
    }
}

export const MovieCarousel = connect(mapStateToProps)(MovieCarouselComponent);
