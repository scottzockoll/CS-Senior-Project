import React from "react";
import { Box, DataTable, Text, Button } from "grommet";

interface UserRecord {
  firstName: string;
  lastName: string;
  email: string;
  watchedMovies: WatchedMovie[];
}

interface WatchedMovie {
  title: string;
  rating: number;
}
const movieRecords: WatchedMovie[] = [
  {
    title: "Avengers Endgame (2019)",
    rating: 5,
  },
  {
    title: "Goon (2011)",
    rating: 3,
  },
  {
    title: "Justice League (2017)",
    rating: 3.5,
  },
];

const userRecord: UserRecord =
  {
    firstName: "Jason",
    lastName: "Zogheb",
    email: "jz@fakeemail.com",
    watchedMovies: movieRecords,
  };

export default function ClientPage() {
  return (
    <Box align="center" pad="large">
      <Text>User: {userRecord.firstName} {userRecord.lastName}</Text>
      <Text>Email: {userRecord.email}</Text>
      <DataTable border={true}
        columns={[
          { property: 'title', header: 'Rating Survey(s)' },
          { property: 'rating', header: 'Rating' },
        ]}
        data={userRecord.watchedMovies}
      />
      <Button label="Reset Movie Survey"/>
    </Box>
  );
}

