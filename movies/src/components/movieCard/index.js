import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import MustWatchIcon from "@mui/icons-material/PlaylistAddCheck";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, action }) {
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

  const cardHeaderAvatar = [
    {key: 0, attrName: "favorite", avatar: (<FavoriteIcon />)},
    {key: 1, attrName: "must_watch", avatar: (<MustWatchIcon />)}
  ]

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          cardHeaderAvatar.map((item) => {
            return movie[item.attrName] ? (
              <Avatar key={item.key} sx={{background: "red", marginRight: "5px"}}>
                {item.avatar}
              </Avatar>
            ) : null
          })
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
