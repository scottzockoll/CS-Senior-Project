import React from 'react';
import { Box, DataTable, Text, Button, Layer, Select, Grommet } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import en from '../../en.json';
import { AppDispatch, RootState } from '../../store';
import { getMovie } from '../../store/movie/actions';

export default function ClientPage() {
    // retrieve the state of the store
    const state = useSelector((state: any) => state);
    const [value, setValue] = React.useState('3');
    const [showUpdateRating, setShowUpdateRating] = React.useState<boolean>();
    const [showSignOut, setShowSignOut] = React.useState<boolean>();
    const [showDeleteAccount, setShowDeleteAccount] = React.useState<boolean>();
    const [showResetMovies, setShowResetMovies] = React.useState<boolean>();

    const dispatch = useDispatch();
    //let user = state.users.entities[state.activeUser];

    return (
        <Grommet>
            <Box pad="medium" align="start">
                <Text>{en.UI_LABELS.fullName}:</Text>

                <Text>{en.UI_LABELS.email}:</Text>
            </Box>
            <Box width="large" pad="medium">
                <DataTable
                    border={true}
                    columns={[
                        { property: 'movieName', header: en.UI_LABELS.title, sortable: true },
                        { property: 'userRating', header: en.UI_LABELS.userRating, sortable: true },
                    ]}
                    sortable={true}
                    onClickRow={() => setShowUpdateRating(true)}
                />

                {showUpdateRating && (
                    <Layer onEsc={() => setShowUpdateRating(false)} onClickOutside={() => setShowUpdateRating(false)}>
                        <Box justify="center">
                            <Text alignSelf="center" size="xxlarge">
                                {en.UI_LABELS.updateRating}
                            </Text>
                            <Text alignSelf="center">----------------------------------------</Text>
                        </Box>
                        <Box direction="row" justify="center">
                            <Select
                                options={['1', '2', '3', '4', '5']}
                                value={value}
                                // add update_rating change below
                                onChange={({ option }) => setValue(option)}
                            />
                        </Box>
                        <Box direction="row" justify="center">
                            <Button label={en.UI_LABELS.confirm} onClick={() => setShowUpdateRating(false)} />
                            <Button label={en.UI_LABELS.cancel} onClick={() => setShowUpdateRating(false)} />
                        </Box>
                    </Layer>
                )}
            </Box>
            <Box>
                <Button
                    label={en.UI_LABELS.resetMovieSurvey}
                    fill={false}
                    alignSelf="start"
                    onClick={() => setShowResetMovies(true)}
                />
                {showResetMovies && (
                    <Layer onEsc={() => setShowResetMovies(false)} onClickOutside={() => setShowResetMovies(false)}>
                        <Box justify="center">
                            <Text alignSelf="center" size="xxlarge">
                                {en.UI_LABELS.resetYourMovies}
                            </Text>
                            <Text alignSelf="center">----------------------------------------</Text>
                        </Box>
                        <Box direction="row" justify="center">
                            <Button label={en.UI_LABELS.yes} onClick={() => setShowResetMovies(false)} />
                            <Button label={en.UI_LABELS.no} onClick={() => setShowResetMovies(false)} />
                        </Box>
                    </Layer>
                )}
            </Box>
            <Box direction="row" alignSelf="end" justify="end">
                <Button
                    label={en.UI_LABELS.signOut}
                    fill={false}
                    alignSelf="end"
                    onClick={() => setShowSignOut(true)}
                />
                {showSignOut && (
                    <Layer onEsc={() => setShowSignOut(false)} onClickOutside={() => setShowSignOut(false)}>
                        <Box justify="center">
                            <Text alignSelf="center" size="xxlarge">
                                {en.UI_LABELS.signOutQuestion}
                            </Text>
                            <Text alignSelf="center">----------------------------------------</Text>
                        </Box>
                        <Box direction="row" justify="center">
                            <Button label={en.UI_LABELS.yes} onClick={() => setShowSignOut(false)} />
                            <Button label={en.UI_LABELS.no} onClick={() => setShowSignOut(false)} />
                        </Box>
                    </Layer>
                )}

                <Button
                    label={en.UI_LABELS.deleteAccount}
                    fill={false}
                    alignSelf="end"
                    onClick={() => setShowDeleteAccount(true)}
                />
                {showDeleteAccount && (
                    <Layer onEsc={() => setShowDeleteAccount(false)} onClickOutside={() => setShowDeleteAccount(false)}>
                        <Box justify="center">
                            <Text alignSelf="center" size="xxlarge">
                                {en.UI_LABELS.deleteYourAccount}
                            </Text>
                            <Text alignSelf="center">----------------------------------------</Text>
                        </Box>
                        <Box direction="row" justify="center">
                            <Button label={en.UI_LABELS.yes} onClick={() => setShowDeleteAccount(false)} />
                            <Button label={en.UI_LABELS.no} onClick={() => setShowDeleteAccount(false)} />
                        </Box>
                    </Layer>
                )}
            </Box>
        </Grommet>
    );
}
