import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Avatar, Stack, Typography, Button, Paper } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MustWatchIcon from "@mui/icons-material/PlaylistAddCheck";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import img from "../../images/film-poster-placeholder.png";

function MovieEntry({ movie, action }) {
  const paperStyle = {
    padding: "10px",
    marginBottom: "10px",
  };

  const { favorites, mustWatch } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.must_watch = true;
  } else {
    movie.must_watch = false;
  }

  const entryAvatar = [
    { key: 0, attrName: "favorite", avatar: <FavoriteIcon /> },
    { key: 1, attrName: "must_watch", avatar: <MustWatchIcon /> },
  ];

  return (
    <Paper sx={{ ...paperStyle }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt={movie.title}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
          variant="square"
          sx={{ width: 100, height: 150 }}
        />

        <Stack
          direction="column"
          spacing={5}
          justifyContent="space-between"
          sx={{ width: 1 }}
        >
          <Stack direction="row" spacing={5}>
            <Typography variant="subtitle1" component="p">
              {movie.title}
            </Typography>

            {entryAvatar.map((item) => {
              return movie[item.attrName] ? (
                <Avatar
                  key={item.key}
                  sx={{ background: "red", marginRight: "5px" }}
                >
                  {item.avatar}
                </Avatar>
              ) : null;
            })}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" component="p" textAlign="center">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>

            <Typography variant="subtitle2" component="p" textAlign="center">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>

            <Link to={`/movies/${movie.id}`}>
              {action && action(movie)}
              <Button variant="outlined" size="medium" color="primary">
                More Info ...
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default MovieEntry;
