import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getPage = (page) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading, isError } = useQuery(
    `discover-page${currentPage}`,
    () => getMovies(currentPage)
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
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  // eslint-disable-next-line no-unused-vars
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      page={currentPage}
      totalPage={totalPage > 500 ? 500 : totalPage} // TMDB api only allows 500 pages
      getPage={getPage}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default HomePage;
