import { Box, Button, Drop, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { API_ROOT } from '../../store/api';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({});

type SearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface SearchResult {
    id: number;
    title: string;
}
interface SearchFieldState {
    focused: boolean;
    movies: SearchResult[];
}

class UnconnectedSearchField extends React.Component<SearchFieldProps, SearchFieldState> {
    protected inputRef: any;
    protected timeout?: number;

    constructor(props: Readonly<SearchFieldProps>) {
        super(props);

        this.state = {
            focused: false,
            movies: [],
        };

        this.inputRef = React.createRef();
    }

    /**
     * Search for a movie
     * @param title
     */
    static movieSearch = async (title: string) => {
        const params: RequestInit = {
            method: 'GET',
            credentials: 'include',
        };

        const response = await fetch(`${API_ROOT}/movie/search/${title}`, params);
        return await response.json();
    };

    onFocusGained = (event: React.FocusEvent) => {
        // show drop down
        this.setState({
            ...this.state,
            focused: true,
        });
    };

    onFocusLost = (event: React.FocusEvent) => {
        // hide drop down, slight delay allows button clicks to function
        setTimeout(() => {
            this.setState({
                ...this.state,
                focused: false,
            });
        }, 100);
    };

    onInput = (event: React.SyntheticEvent) => {
        // prevent old api request from firing
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        const input = event.target as HTMLInputElement;
        if (input.value.length < 3) {
            return;
        }

        // fire request in 150ms if the user stops typing
        this.timeout = setTimeout(async () => {
            try {
                // make request and update state
                const movies = await SearchField.movieSearch(input.value);

                this.setState({
                    ...this.state,
                    movies,
                });
            } catch (ex) {
                // clear suggestions
                this.setState({
                    ...this.state,
                    movies: [],
                });
            }
        }, 150) as any;
    };

    onSelect = (movie: SearchResult) => {
        this.inputRef.current.value = movie.title;
        // TODO: Show rating prompt here!!!
    };

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
                        {this.state.movies.map((movie) => (
                            <Button
                                key={movie.id}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.onSelect(movie);
                                }}
                            >
                                <Text>+ {movie.title}</Text>
                            </Button>
                        ))}
                    </Drop>
                )}
            </Box>
        );
    }
}

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
