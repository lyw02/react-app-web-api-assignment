import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../contexts/authContext";
import { addToFavorites, deleteFromFavorites } from "../../api";

const AddToFavoritesIcon = ({ movie }) => {
  // const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    const currentUserData = await authContext.currentUser
    addToFavorites(currentUserData[0]._id, movie.id);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
