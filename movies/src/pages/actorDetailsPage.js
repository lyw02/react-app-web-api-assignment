import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActorDetails, getActorMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorPage = (props) => {
  const { id } = useParams();
  
  const { data: actor, error: actorError, isLoading: isActorLoading, isError: isActorError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  const { data: cast, error: castError, isLoading: isCastLoading, isError: isCastError } = useQuery(
    ["cast", { id: id }],
    getActorMovieCredits
  );

  if (isActorLoading || isCastLoading) {
    return <Spinner />;
  }

  if (isActorError) {
    return <h1>{actorError.message}</h1>;
  }

  if (isCastError) {
    return <h1>{castError.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} cast={cast}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ActorPage;