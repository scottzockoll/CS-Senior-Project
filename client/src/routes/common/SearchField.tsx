import { Box, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { searchMovie } from '../../store/movie/actions';

const mapStateToProps = (state: RootState) => ({
    // to do
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    movieSearch: (movieTitle: string) => dispatch(searchMovie(movieTitle)),
});

type SearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedSearchField: React.FC<SearchFieldProps> = ({ movieSearch }) => {
    return (
        <TextInput
            placeholder={en.UI_LABELS.movieSearch}
            // dropProps={}
            onInput={(event: React.SyntheticEvent) => {
                const input = event.target as HTMLInputElement;
                movieSearch(input.value);
            }}
        />
    );
};

export const SearchField = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSearchField);
