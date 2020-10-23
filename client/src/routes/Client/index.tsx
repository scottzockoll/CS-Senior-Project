
import React from 'react';
import { Box, DataTable, Text, Button, Layer, Grommet} from 'grommet';
import { UserRecord, WatchedMovie } from '../admin/UserRecord';




interface ClientPageProps {
    userRecord: UserRecord;
}


export default function ClientPage(props: ClientPageProps) {

  const [showSignOut, setShowSignOut] = React.useState<boolean>();
  const [showDeleteAccount, setShowDeleteAccount] = React.useState<boolean>();
  const [showResetMovies, setShowResetMovies] = React.useState<boolean>();

  return (
    <Grommet full={true}>
      <Box pad="medium" align="start">
        <Text>User: {props.userRecord.firstName} {props.userRecord.lastName}</Text>
        <Text>Email: {props.userRecord.email}</Text>
      </Box>

      <Box width="large" pad="medium">
        <DataTable border={true}
          columns={[
            { property: 'title', header: 'Rating Survey(s)' },
            { property: 'userRating', header: 'Rating' },
          ]}
          data={props.userRecord.watchedMovies}
        />
      </Box>

      <Box pad="medium">
        <Button label="Reset Movie Survey" fill = {false} alignSelf="start" onClick={() => setShowResetMovies(true)}/>
          {showResetMovies && (
              <Layer onEsc={() => setShowResetMovies(false)} onClickOutside={() => setShowResetMovies(false)}>
                  <Box justify="center">
                      <Text size="xxlarge">Reset Your Movies?</Text>
                      <Text>----------------------------------------</Text>
                  </Box>

                  <Box direction="row" justify="center">
                      <Button label="Yes" onClick={() => setShowResetMovies(false)} />
                      <Button label="No" onClick={() => setShowResetMovies(false)} />
                  </Box>
              </Layer>
          )}
      </Box>

      <Box as="footer" direction="row" justify="end">
        <Button label="Sign Out" onClick={() => setShowSignOut(true)}/>
          {showSignOut && (
              <Layer onEsc={() => setShowSignOut(false)} onClickOutside={() => setShowSignOut(false)}>
                  <Box justify="center">
                      <Text size="xxlarge">Sign Out?</Text>
                      <Text>---------------------</Text>
                  </Box>

                  <Box direction="row" justify="center">
                      <Button label="Yes" onClick={() => setShowSignOut(false)} />
                      <Button label="No" onClick={() => setShowSignOut(false)} />
                  </Box>
              </Layer>
          )}

        <Button label="Delete Account"  onClick={() => setShowDeleteAccount(true)}/>
          {showDeleteAccount && (
              <Layer onEsc={() => setShowDeleteAccount(false)} onClickOutside={() => setShowDeleteAccount(false)}>
                  <Box justify="center">
                      <Text size="xxlarge">Delete Your Account?</Text>
                      <Text>--------------------------------------------</Text>
                  </Box>

                  <Box direction="row" justify="center">
                      <Button label="Yes" onClick={() => setShowDeleteAccount(false)} />
                      <Button label="No" onClick={() => setShowDeleteAccount(false)} />
                  </Box>
              </Layer>
          )}
      </Box>
    </Grommet>
  );
}
