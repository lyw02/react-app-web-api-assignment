# Assignment 2 - Web API.

Name: Your Name

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Feature 1 
 + Feature 2 
 + Feature 3 
 + etc

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 

- /api/movies/{movieId}/credits | GET | Gets all credits of a movie
- /api/movies/actor/{actorId} | GET | Gets a single actor
- /api/movies/actor/{actorId}/movie_credits | GET | Gets acted movies of an actor
- /api/movies/{movieId}/similar | GET | Gets similar movies of a movie
- /api/movies/trending/{timeWindow} | GET | Gets trending movies by time window (day or week)
- /api/movies/search/{keyword} | GET | Gets movies by searching keyword

- /api/reviews/{movieId}/mongodb | GET | Gets reviews of a movie from MongoDB
- /api/reviews/{movieId}/tmdb | GET | Gets reviews of a movie from TMDB
- /api/reviews/{movieId} | POST | Creates new review of a movie, stores in MongoDB
- /api/reviews/{reviewId} | PUT | Updates a review
- /api/reviews/{reviewId} | DELETE | Deletes a review

- /api/favorites | GET | Gets all favorite movies of current user
- /api/favorites/{movieId} | POST | Add a movie to favorite movies of current user
- /api/favorites/{movieId} | DELETE | Deletes a movie from favorite movies of current user

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   