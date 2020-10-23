
import React from 'react';
import { Box, DataTable, Text, Button, Grommet} from 'grommet';
import { UserRecord, WatchedMovie } from '../admin/UserRecord';
import NavigationBar from '../common/NavigationBar';



interface ClientPageProps {
    userRecord: UserRecord;
}


export default function ClientPage(props: ClientPageProps) {
  return (
    <Grommet full={true} >
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
        <Button label="Reset Movie Survey" fill = {false} alignSelf="start" />
      </Box>
      <Box as="footer" direction="row" justify="end">
        <Button label="Sign Out" />
        <Button label="Delete Account" />
      </Box>
    </Grommet>
  );
}
