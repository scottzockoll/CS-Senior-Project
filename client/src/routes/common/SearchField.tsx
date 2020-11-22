import { Box, Button, Drop, TextInput, Timeout } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { searchMovie } from '../../store/movie/actions';
import { Movie } from '../../store/movie';

const mapStateToProps = (state: RootState) => ({
    movies: state.movieSearchResults.ids.map((id) => state.movieSearchResults.entities[id]),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    movieSearch: (movieTitle: string) => dispatch(searchMovie(movieTitle)),
});

type SearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface SearchFieldState {
    focused: boolean;
    movies: {
        id: number;
        title: string;
    }[];
}

class UnconnectedSearchField extends React.Component<SearchFieldProps, SearchFieldState> {
    protected inputRef: any;
    protected timeout?: Timeout;

    constructor(props: Readonly<SearchFieldProps>) {
        super(props);

        this.state = {
            focused: false,
            movies: [],
        };

        this.inputRef = React.createRef();
    }

    apiRequest = async (title: string) => {
        const params: RequestInit = {
            method: 'GET',
            credentials: 'include',
        };

        const response = await fetch(`http://localhost:5000/api/v1/movie/search/${title}`, params);
        return await response.json();
    };

    onFocusGained = (event: React.FocusEvent) => {
        this.setState({
            ...this.state,
            focused: true,
        });
    };

    onFocusLost = (event: React.FocusEvent) => {
        this.setState({
            ...this.state,
            focused: false,
        });
        if (this.inputRef.current) {
            (this.inputRef.current as HTMLInputElement).value = '';
        }
    };

    onInput = (event: React.SyntheticEvent) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(async () => {
            const input = event.target as HTMLInputElement;
            const movies = await this.apiRequest(input.value);

            this.setState({
                ...this.state,
                movies,
            });
        }, 250);
    };

    onSelect = (movie: Movie) => {};

    render() {
        return (
            <Box>
                <TextInput
                    ref={this.inputRef}
                    placeholder={en.UI_LABELS.movieSearch}
                    onFocus={this.onFocusGained}
                    onBlur={this.onFocusLost}
                    onInput={this.onInput}
                />
                {this.inputRef.current && this.state.focused && (
                    <Drop target={this.inputRef.current} align={{ top: 'bottom' }}>
                        {this.props.movies.map((movie) => (
                            <Button
                                key={movie.id}
                                onClick={(event: React.MouseEvent) => {
                                    this.onSelect(movie);
                                }}
                            >
                                {movie.title}
                            </Button>
                        ))}
                    </Drop>
                )}
            </Box>
        );
    }
}

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
