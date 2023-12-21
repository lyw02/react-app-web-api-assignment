import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";

const MoviePage = (props) => {
  const { id } = useParams();
  
  const { data: movie, error: movieError, isLoading: isMovieLoading, isError: isMovieError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: actors, error: actorsError, isLoading: isActorsLoading, isError: isActorsError } = useQuery(
    ["actors", { id: id }],
    getMovieCredits
  );

  const { data: similarMovies, error: similarMoviesError, isLoading: isSimilarMoviesLoading, isError: isSimilarMoviesError } = useQuery(
    ["similarMovies", { id: id }],
    getSimilarMovies
  );

  if (isMovieLoading || isActorsLoading || isSimilarMoviesLoading) {
    return <Spinner />;
  }

  if (isMovieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (isActorsError) {
    return <h1>{actorsError.message}</h1>
  }

  if (isSimilarMoviesError) {
    return <h1>{similarMoviesError.message}</h1>
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} actors={actors} similarMovies={similarMovies} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;