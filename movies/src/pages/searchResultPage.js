import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesByKeyword } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const SearchResultPage = (props) => {
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const getPage = (page) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading, isError } = useQuery(
    `search-${keyword}-page${currentPage}`,
    () => getMoviesByKeyword(keyword, currentPage)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  console.log(`movies: ${JSON.stringify(movies)}`);
  const totalPage = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter((m) => m.must_watch);
  localStorage.setItem("must_watch", JSON.stringify(mustWatch));
  // eslint-disable-next-line no-unused-vars
  const addToMustWatch = (movieId) => true;

  return (
    <PageTemplate
      title={`Search result - keyword "${keyword}"`}
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

export default SearchResultPage;
