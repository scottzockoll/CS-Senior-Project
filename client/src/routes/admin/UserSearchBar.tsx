import { Box, Select, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { searchUsers } from '../../store/user/actions';
import { UserSearchFilter } from '../../store/user';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    searchUsers: (filter: UserSearchFilter, searchVal: string, offset: number, limit: number) => {
        dispatch(searchUsers(filter, searchVal, offset, limit));
    },
});

type UserSearchFieldProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface SearchFieldState {
    filter: UserSearchFilter;
    focused: boolean;
}

const PAGE_SIZE = 200;

class UnconnectedUserSearchBar extends React.Component<UserSearchFieldProps, SearchFieldState> {
    protected inputRef: any;
    protected selectRef: any;
    protected timeout?: number;

    constructor(props: Readonly<UserSearchFieldProps>) {
        super(props);

        this.state = {
            focused: false,
            filter: UserSearchFilter.NO_FILTER,
        };

        this.inputRef = React.createRef();
        this.selectRef = React.createRef();
    }

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

    onFilterChange = (option: string) => {
        switch (option) {
            case 'First Name':
                this.setState({
                    ...this.state,
                    filter: UserSearchFilter.FIRST_NAME,
                });
                break;
            case 'Last Name':
                this.setState({
                    ...this.state,
                    filter: UserSearchFilter.LAST_NAME,
                });
                break;
            case 'Email':
                this.setState({
                    ...this.state,
                    filter: UserSearchFilter.EMAIL,
                });
                break;
            default:
                this.setState({
                    ...this.state,
                    filter: UserSearchFilter.NO_FILTER,
                });
        }
    };

    onInput = (event: React.SyntheticEvent) => {
        // prevent old api request from firing
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // Check if a filter has been selected
        if (this.state.filter === UserSearchFilter.NO_FILTER) {
            // No filter selected, exit call
            return;
        }

        // retrieve the input
        const input = event.target as HTMLInputElement;

        // Make the search request
        this.props.searchUsers(this.state.filter, input.value, 0, PAGE_SIZE);

        // // fire request in 150ms if the user stops typing
        // this.timeout = setTimeout(async () => {
        //   try {
        //     // Check if a filter has been selected
        //     if(this.state.filter === UserSearchFilter.NO_FILTER) {
        //       // No filter selected, exit call
        //       return;
        //     }
        //
        //     // retrieve the input
        //     const input = event.target as HTMLInputElement;
        //
        //     // Make the search request
        //     this.props.searchUsers(this.state.filter, input.value, 0, PAGE_SIZE);
        //   } catch (ex) {
        //     // clear suggestions
        //     this.setState({
        //       ...this.state
        //     });
        //   }
        // }, 150) as any;
    };

    render() {
        return (
            <Box direction="row" align="end" width={'medium'}>
                <Select
                    options={['', 'First Name', 'Last Name', 'Email']}
                    ref={this.selectRef}
                    onChange={({ option }) => {
                        this.onFilterChange(option);
                    }}
                />
                <TextInput ref={this.inputRef} placeholder={en.UI_LABELS.searchUser} onInput={this.onInput} />
            </Box>
        );
    }
}

export const UserSearchBar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedUserSearchBar);
