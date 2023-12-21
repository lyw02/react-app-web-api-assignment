import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getPage = (page) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading, isError } = useQuery(
    `upcoming-page${currentPage}`,
    () => getUpcomingMovies(currentPage)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPage = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter((m) => m.must_watch);
  localStorage.setItem("must_watch", JSON.stringify(mustWatch));
  // eslint-disable-next-line no-unused-vars
  const addToMustWatch = (movieId) => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      page={currentPage}
      totalPage={totalPage > 500 ? 500 : totalPage} // TMDB api only allows 500 pages
      getPage={getPage}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
