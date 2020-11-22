import { Box, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { searchMovie } from './actions';

const mapStateToProps = (state: RootState) => ({
    // movieSuggestions: ['toy story 1', 'toy story 2', 'toy story 3']
    movieSuggestions: Object.values(state.movieSearchResults.entities).map((movie) => movie.title),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    movieSearch: (movieTitle: string) => dispatch(searchMovie(movieTitle)),
});

type SearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedSearchField: React.FC<SearchFieldProps> = ({ movieSearch, movieSuggestions }) => {
    return (
        <Box>
            <TextInput
                placeholder={en.UI_LABELS.movieSearch}
                suggestions={movieSuggestions}
                onInput={(event: React.SyntheticEvent) => {
                    const input = event.target as HTMLInputElement;
                    movieSearch(input.value);
                }}
            />
        </Box>
    );
};

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
