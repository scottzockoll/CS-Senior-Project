import React from "react";
import { Box, DataTable, Text, Button } from "grommet";
import {UserRecord, WatchedMovie} from "./interfaces";

/*
let movieRecords: WatchedMovie[] = [
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
*/

interface ClientPageProps{
  userRecord: UserRecord
}



// function resetMovies(userRecord: UserRecord){
//   userRecord.watchedMovies = []
//   ClientPage(userRecord)
//
// }


export default function ClientPage(props: ClientPageProps) {
  return (
    <Box align="center" pad="large">
      <Text>User: {props.userRecord.firstName} {props.userRecord.lastName}</Text>
      <Text>Email: {props.userRecord.email}</Text>
      <DataTable border={true}
        columns={[
          { property: 'title', header: 'Rating Survey(s)' },
          { property: 'rating', header: 'Rating' },
        ]}
        data={props.userRecord.watchedMovies}
      />
      <Button label="Reset Movie Survey" />
    </Box>
  );
}

