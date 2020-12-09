import React from 'react';
import { Box } from 'grommet';
import { SearchField } from './SearchField';
import StarRating from './StarRating';

type RatedSuggestion = {
    movie: {
        id?: number;
        title?: string;
    };
    rating: number;
};
interface RatedSearchFieldProps {
    id?: number;
    value?: string;
    onClick: (suggestion: RatedSuggestion) => void;
    rating?: number;
    maximum?: number;
}
interface RatedSearchFieldState {
    suggestion: RatedSuggestion;
}

export class RatedSearchField extends React.Component<RatedSearchFieldProps, RatedSearchFieldState> {
    constructor(props: RatedSearchFieldProps) {
        super(props);

        this.state = {
            suggestion: {
                movie: {
                    id: this.props.id,
                    title: this.props.value,
                },
                rating: this.props.rating ?? 0,
            },
        };
    }

    render() {
        return (
            <Box direction={'row'} pad={{ vertical: 'xxsmall' }}>
                <Box flex={'grow'}>
                    <SearchField
                        displayModal={false}
                        defaultValue={this.state.suggestion.movie.title}
                        onSelect={(suggestion) => {
                            const newSuggestion: RatedSuggestion = {
                                movie: {
                                    id: suggestion.value,
                                    title: suggestion.label,
                                },
                                rating: this.state.suggestion.rating,
                            };

                            this.setState({
                                suggestion: newSuggestion,
                            });

                            if (this.props.onClick) {
                                this.props.onClick(newSuggestion);
                            }
                        }}
                    />
                </Box>
                <Box pad={{ horizontal: 'xlarge' }}>
                    <StarRating
                        current={this.state.suggestion.rating}
                        maximum={5}
                        onClick={(event, value) => {
                            const newSuggestion: RatedSuggestion = {
                                movie: this.state.suggestion.movie,
                                rating: value,
                            };

                            this.setState({
                                suggestion: newSuggestion,
                            });

                            if (this.props.onClick) {
                                this.props.onClick(newSuggestion);
                            }
                        }}
                    />
                </Box>
            </Box>
        );
    }
}
