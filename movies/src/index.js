import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
// import SignUpWithEmail from "./components/firebaseAuth/signUpWithEmail";
// import Login from "./components/firebaseAuth/login";
// import UserProfile from "./components/firebaseAuth/userProfile";
// import PasswordReset from "./components/firebaseAuth/passwordReset";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import { AuthContextProvider } from "./contexts/authContext";
import SearchResultPage from "./pages/searchResultPage";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <AuthContextProvider>
            <SiteHeader />
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route
                path="/movies/favorites"
                element={<FavoriteMoviesPage />}
              />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route
                path="/movies/trending/:timeWindow"
                element={<TrendingMoviesPage />}
              />
              <Route element={<ProtectedRoutes />}>
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/actors/:id" element={<ActorPage />} />
              </Route>
              {/* <Route path="/signup" element={<SignUpWithEmail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/password/reset" element={<PasswordReset />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/search/:keyword" element={<SearchResultPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
