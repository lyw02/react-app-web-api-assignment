import React from "react";
import Movie from "../movieEntry";
import { Stack } from "@mui/material";

const MovieEntryList = ( {movies, action }) => {
  let movieEntries = movies.map((m) => (
    <Stack key={m.id} direction="column">
      <Movie key={m.id} movie={m} action={action} />
    </Stack>
  ));
  return movieEntries;
};

export default MovieEntryList;