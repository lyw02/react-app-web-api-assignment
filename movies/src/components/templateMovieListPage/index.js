import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import MovieEntryList from "../movieEntryList";
import ToolBar from "../toolBar";
import Pagination from "@mui/material/Pagination";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // eslint-disable-line no-unused-vars
import _ from "lodash";

function MovieListPageTemplate({
  movies,
  page,
  totalPage,
  getPage,
  title,
  action,
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseDateStartFilter, setReleaseDateStartFilter] = useState();
  const [releaseDateEndFilter, setReleaseDateEndFilter] = useState();
  const [ratingStartFilter, setRatingStartFilter] = useState(0);
  const [ratingEndFilter, setRatingEndFilter] = useState(10);
  const [viewType, setViewType] = useState("Card");
  const [sortBy, setSortBy] = useState("Default");
  const genreId = Number(genreFilter);

  const handlePageChange = (event, value) => {
    getPage(value);
  };

  let filteredMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return (
        m.vote_average >= ratingStartFilter && m.vote_average <= ratingEndFilter
      );
    });

  if (releaseDateStartFilter && releaseDateEndFilter) {
    filteredMovies = filteredMovies.filter((m) => {
      return dayjs(m.release_date).isBetween(
        dayjs(releaseDateStartFilter),
        dayjs(releaseDateEndFilter),
        "day",
        []
      );
    });
  } else if (releaseDateStartFilter) {
    filteredMovies = filteredMovies.filter((m) => {
      return dayjs(m.release_date).isBetween(
        dayjs(releaseDateStartFilter),
        dayjs(),
        "day",
        []
      );
    });
  } else if (releaseDateEndFilter) {
    filteredMovies = filteredMovies.filter((m) => {
      return dayjs(m.release_date).isBetween(
        dayjs("1900-01-01"),
        dayjs(releaseDateEndFilter),
        "day",
        []
      );
    });
  }

  let filteredMoviesSorted;
  if (sortBy === "title") {
    filteredMoviesSorted = _.orderBy(filteredMovies, "title", "asc");
  } else if (sortBy === "releaseDate") {
    filteredMoviesSorted = _.orderBy(filteredMovies, "release_date", "desc");
  } else if (sortBy === "rating") {
    filteredMoviesSorted = _.orderBy(filteredMovies, "vote_average", "desc");
  }

  let displayedMovies;
  filteredMoviesSorted
    ? (displayedMovies = filteredMoviesSorted)
    : (displayedMovies = filteredMovies);

  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "ratingStart") {
      setRatingStartFilter(value);
    } else if (type === "ratingEnd") {
      setRatingEndFilter(value);
    } else if (type === "releaseDateStart") {
      setReleaseDateStartFilter(dayjs(value));
    } else if (type === "releaseDateEnd") {
      setReleaseDateEndFilter(dayjs(value));
    }
  };

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        <ToolBar
          viewType={viewType}
          setViewType={setViewType}
          userSortBy={sortBy}
          setSortBy={setSortBy}
        />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingStartFilter={ratingStartFilter}
            ratingEndFilter={ratingEndFilter}
            releaseDateStartFilter={releaseDateStartFilter}
            releaseDateEndFilter={releaseDateEndFilter}
          />
        </Grid>
        {viewType === "Card" ? (
          <MovieList action={action} movies={displayedMovies} />
        ) : (
          <Grid key="listContainer" item xs={12} sm={6} md={8} lg={9} xl={10}>
            <MovieEntryList action={action} movies={displayedMovies} />
          </Grid>
        )}
      </Grid>
      <Grid container sx={{ margin: "20px", justifyContent: "center" }}>
        <Pagination
          color="secondary"
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
