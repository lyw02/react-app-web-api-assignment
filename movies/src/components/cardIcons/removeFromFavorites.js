import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../contexts/authContext";
import { deleteFromFavorites } from "../../api";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const authContext = useContext(AuthContext);

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    const currentUserData = await authContext.currentUser
    deleteFromFavorites(currentUserData[0]._id, movie.id);
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
