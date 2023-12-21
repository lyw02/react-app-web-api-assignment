# Assignment 1 - ReactJS app.

Name: Yiwei Liu

## Overview.

This repository is an extended version of React Movies App in WAD2. 

It has :
+ Plenty of extended functionalities and new features.
+ 6 additional API end points (5 are parameterised).
+ 7 additional routing paths (public or protected).
+ Plenty of new Material UI components and additional third-party libraries.

### Features.

+ Add actor details pages:
  + The page lists an actor's biography, information, images, and acted movies. 
  + The biography can be expanded or folded by clicking a button.
  + Users can jump to movie details page by clicking a movie's poster or name in the acted movied list.
+ Modify movie details pages:
  + The page displays a list of top billed cast actors, with actors' avatar, name, and character name
  + The page displays other movies that similar to that movie.
  + Users can switch between top billed cast and similar movies by clicking subtitles.
  + Users can jump to actor details page by clicking an actor's avatar or name in the top billed cast list.
+ Modify movies display view:
  + Users can switch view between movie cards and movie entries list by using toggle buttons.
+ Add trending movies pages:
  + The page lists daily or weekly trending movies.
  + Users can choose different time window (day or week) at the site header by a popup menu.
+ Add pagination feature:
  + Users can switch among different pages by Material UI Pagination component.
  + When users change page number by clicking the pagination component, an API request will be sent with the query param \`?page=${page}\`, and the response will be added to react-query cache.
+ Add Firebase authentication feature:
  + Users can sign up and log in with emails and passwords.
  + Users can view there personal profile.
  + Users can reset password by email.
  + Users can log out.
+ Add new filtering option: rating and release date:
  + Users can set rating range to filter movies.
  + Users can set release date range, by a date picker, to filter movies.
+ Add sorting feature:
  + Users can sort movie lists by title, release date, or rating.
+ Add searching feature:
  + Users can search movies by entering a keyword, the results will be displayed in a new page with movies that contains keyword in their titles.
  + This feature is different with the search field in filtering movie card, which only filters movies in current page. In stead, this feature searches movies from the whole database. 

## Setup requirements.

__Install dependencies__:
`$ npm install`

__Non-standard dependencies includes__:
`$ npm install firebase dayjs @mui/x-date-pickers lodash uuid` (No need to run this)

__Config `.env` file__:

Note: `.env` file should not be pushed to a remote repo, but in order to demonstrate this app, just create a `.env` file in `movies` folder and add following content:

    REACT_APP_TMDB_KEY=b077d449f6bc9de14639188c5e777fc4
    FAST_REFRESH=false
    REACT_APP_FIREBASE_API_KEY=AIzaSyBFIGJnzVswernE4dzLZjPbLOMsPlPNyD0
    REACT_APP_FIREBASE_API_AUTH_DOMAIN=movies-app-a06d9.firebaseapp.com
    REACT_APP_FIREBASE_API_PROJECT_ID=movies-app-a06d9
    REACT_APP_FIREBASE_API_STORAGE_BUCKET=movies-app-a06d9.appspot.com
    REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID=35045024520
    REACT_APP_FIREBASE_API_APP_ID=1:35045024520:web:9293abc36463131b36c2bd
    REACT_APP_FIREBASE_MEASUREMENT_ID=G-00PENQPJ7W


## API endpoints.

+ Person (actor) details - `person/:id`
+ Movies that a person (actor) acted - `person/:id/movie_credits`
+ Person (actor) images - `person/:id/images`
+ Similar movies - `movie/:id/similar`
+ Trending movies (day or week) - `trending/movie/:time_window`
+ Search for movies by title keywords - `search/movie?query=keyword`

## Routing.

Public:
+ `/actors/:id` - displays an actor's details
+ `/movies/trending/:timeWindow` - displays daily or weekly trending movies
+ `/search/:keyword` - displays search results with given keyword. 

Protected (i.e. require authentication):
+ `/signup` - sign up page, users can sign up with email and password
+ `/login` - log in page, users can log in with email and password
+ `/user` - user profile page, displays user info.
+ `/password/reset` - password reset page, users can enter email and get a password reset email.

## Independent learning.

+ __Firebase__ is used to implement user authentication, including sign up, log in, log out, and user profile.
  + Source code filenames:
    + src/firebase.js
    + src/contexts/authContext.js
    + src/components/firebaseAuth/login.js
    + src/components/firebaseAuth/passwordReset.js
    + src/components/firebaseAuth/signUpWithEmail.js
    + src/components/firebaseAuth/userProfile.js
  + References:
    + Tutorial: https://www.youtube.com/watch?v=PKwu15ldZ7k

+ __Day.js__ is a minimalist JavaScript library that deals with date. In this app, I use Day.js to help implementing new filtering option that based on movies' release date. 
  + Source code filenames:
    + src/components/filterMoviesCard/index.js
    + src/components/templateMovieListPage/index.js
  + References:
    + Doc: https://day.js.org/docs/en/installation/installation

+ __MUI X__ is an extension library of Material UI. In this app, I use __MUI X Date Picker__, a component for picking date, to implement new filtering option that based on movies' release date, together with Day.js.
  + Source code filenames:
    + src/components/filterMoviesCard/index.js
  + References:
    + Doc: https://mui.com/x/react-date-pickers/date-picker/

+ __Lodash__ is a JavaScript utility library that provides various functions. In this app, I use Lodash to implement sorting feature.
  + Source code filenames:
    + src/components/toolBar/index.js
    + src/components/templateMovieListPage/index.js
  + References:
    + Doc: https://lodash.com/docs/4.17.15

+ __UUID__ is a library for creating random unique id. In this app, I use it to genetate unique key for each list items.
  + References:
    + Doc: https://www.npmjs.com/package/uuid

+ New Material UI components used includes: Toggle Button, Avatar, Backdrop, Snackbar, Pagination, Stack.
  + References:
    + Doc: https://mui.com/material-ui/getting-started/