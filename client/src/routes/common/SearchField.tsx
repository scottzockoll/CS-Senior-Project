import { Box, TextInput } from 'grommet';
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
    movies: SearchResult[];
}

class UnconnectedSearchField extends React.Component<SearchFieldProps, SearchFieldState> {
    protected inputRef: any;
    protected timeout?: number;

    constructor(props: Readonly<SearchFieldProps>) {
        super(props);

        this.state = {
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

    onSelect = (event: {
        target: React.RefObject<HTMLElement>['current'];
        suggestion: { label: string; value: number };
    }) => {
        this.inputRef.current.value = event.suggestion.label;
    };

    render() {
        return (
            <Box>
                <TextInput
                    ref={this.inputRef}
                    suggestions={this.state.movies.map((movie) => ({
                        label: movie.title,
                        value: movie.id,
                    }))}
                    placeholder={en.UI_LABELS.movieSearch}
                    onSelect={this.onSelect}
                    onInput={this.onInput}
                />
            </Box>
        );
    }
}

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
