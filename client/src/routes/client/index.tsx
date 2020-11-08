import React from 'react';
import { Box, DataTable, Text, Button, Layer, Grommet } from 'grommet';
import { UserRecord } from '../admin/UserRecord';
import en from '../../en.json';

interface ClientPageProps {
    userRecord: UserRecord;
}

export default function ClientPage(props: ClientPageProps) {
    const [showSignOut, setShowSignOut] = React.useState<boolean>();
    const [showDeleteAccount, setShowDeleteAccount] = React.useState<boolean>();
    const [showResetMovies, setShowResetMovies] = React.useState<boolean>();

    return (
        <Grommet>
            <Box pad="medium" align="start">
                <Text>
                    {en.UI_LABELS.fullName}: {props.userRecord.firstName} {props.userRecord.lastName}
                </Text>
                <Text>
                    {en.UI_LABELS.email}: {props.userRecord.email}
                </Text>
            </Box>
            <Box width="large" pad="medium">
                <DataTable
                    border={true}
                    columns={[
                        { property: 'title', header: en.UI_LABELS.title },
                        { property: 'userRating', header: en.UI_LABELS.userRating },
                    ]}
                    data={props.userRecord.watchedMovies}
                />
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
                            <Text size="xxlarge">{en.UI_LABELS.resetYourMovies}</Text>
                            <Text>----------------------------------------</Text>
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
                            <Text size="xxlarge">{en.UI_LABELS.signOutQuestion}</Text>
                            <Text>---------------------</Text>
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
                            <Text size="xxlarge">{en.UI_LABELS.deleteYourAccount}</Text>
                            <Text>--------------------------------------------</Text>
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