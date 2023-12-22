import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie, getFavorites } from "../api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getFavorites().then((favorites) => {
      const newMovieIds = favorites.results.map((r) => r.movie_id);
      setMovieIds(newMovieIds);
    });
  }, []);

  useEffect(() => {
    Promise.all(movieIds.map((id) => getMovie(id))).then((newMovies) => {
      setMovies(newMovies);
    });
  }, [movieIds]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      page={currentPage}
      totalPage={1}
      getPage={handlePageChange}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
