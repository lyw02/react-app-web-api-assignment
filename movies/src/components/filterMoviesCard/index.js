import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const {
    data: genresData,
    error: genresError,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useQuery("genres", getGenres);

  if (isGenresLoading) {
    return <Spinner />;
  }

  if (isGenresError) {
    return <h1>{genresError.message}</h1>;
  }

  const genres = genresData.genres;

  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e && e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingStartChange = (e) => {
    handleChange(e, "ratingStart", e.target.value);
  };

  const handleRatingEndChange = (e) => {
    handleChange(e, "ratingEnd", e.target.value);
  };

  const handleReleaseDateStartChange = (date) => {
    handleChange(null, "releaseDateStart", date);
  };

  const handleReleaseDateEndChange = (date) => {
    handleChange(null, "releaseDateEnd", date);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 204, 0)",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Stack direction="row" justifyContent="space-between">
          <TextField
            sx={{ ...formControl, minWidth: 100 }}
            id="rating-start"
            label="Rating from"
            variant="filled"
            value={props.ratingStartFilter}
            onChange={handleRatingStartChange}
          />
          <TextField
            sx={{ ...formControl, minWidth: 100 }}
            id="rating-start"
            label="to"
            variant="filled"
            value={props.ratingEndFilter}
            onChange={handleRatingEndChange}
          />
        </Stack>
        <Stack>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              label="Release time from"
              value={props.releaseDateStartFilter}
              onChange={handleReleaseDateStartChange}
              sx={{ ...formControl, minWidth: 100 }}
            />
            <DatePicker
              label="to"
              value={props.releaseDateEndFilter}
              onChange={handleReleaseDateEndChange}
              sx={{ ...formControl, minWidth: 100 }}
            />
          </LocalizationProvider>
        </Stack>
      </CardContent>
      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
