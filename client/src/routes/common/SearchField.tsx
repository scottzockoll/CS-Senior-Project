import { Box, Drop, DropType, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { searchMovie } from '../../store/movie/actions';

const mapStateToProps = (state: RootState) => ({
    movies: state.movieSearchResults.ids.map((id) => state.movieSearchResults.entities[id]),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    movieSearch: (movieTitle: string) => dispatch(searchMovie(movieTitle)),
});

type SearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class UnconnectedSearchField extends React.Component<SearchFieldProps> {
    protected dropRef: React.RefObject<DropType>;
    protected inputRef: React.RefObject<typeof TextInput>;

    constructor(props: Readonly<SearchFieldProps>) {
        super(props);

        this.dropRef = React.createRef();
        this.inputRef = React.createRef();
    }

    render() {
        console.warn(this.props.movies);
        return (
            <Box>
                <TextInput
                    placeholder={en.UI_LABELS.movieSearch}
                    dropTarget={this.dropRef}
                    dropProps={{
                        align: {
                            top: 'bottom',
                        },
                    }}
                    onInput={(event: React.SyntheticEvent) => {
                        const input = event.target as HTMLInputElement;
                        this.props.movieSearch(input.value);
                    }}
                />
                <Drop ref={'dropRef'} target={this.inputRef}>
                    <ul>
                        {this.props.movies.map((movie) => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                </Drop>
            </Box>
        );
    }
}

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
