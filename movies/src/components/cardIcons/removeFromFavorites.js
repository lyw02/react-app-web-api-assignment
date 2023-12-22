import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { deleteFromFavorites } from "../../api";

const RemoveFromFavoritesIcon = ({ movie }) => {
  // const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    // context.removeFromFavorites(movie);
    deleteFromFavorites(authContext.currentUser._id, movie.id);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
