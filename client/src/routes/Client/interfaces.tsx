import React from "react";


export interface UserRecord {
  firstName: string;
  lastName: string;
  email: string;
  watchedMovies: WatchedMovie[];
}

export interface WatchedMovie {
  title: string;
  rating: number;
}