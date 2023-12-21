import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardViewIcon from "@mui/icons-material/Apps";
import ListViewIcon from "@mui/icons-material/ViewList";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const ToolBar = ({ viewType, setViewType, sortBy, setSortBy }) => {
  const [searchText, setSearchText] = useState();

  const navigate = useNavigate();

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  const handleViewTypeChange = (event, newViewType) => {
    if (newViewType !== null) {
      setViewType(newViewType);
    }
  };

  const handleSearch = () => {
    searchText && navigate(`/search/${searchText}`, { replace: true });
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        margin: "10px",
        alignItems: "center",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          label="Search from all movies"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton type="button" onClick={handleSearch} sx={{ p: "10px" }}>
          <SearchIcon color="secondary" />
        </IconButton>
      </Stack>
      <ToggleButtonGroup
        color="secondary"
        value={viewType}
        exclusive
        onChange={handleViewTypeChange}
      >
        <ToggleButton value="Card">
          <CardViewIcon />
        </ToggleButton>
        <ToggleButton value="List">
          <ListViewIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Sort by"
          onChange={handleSortByChange}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ToolBar;
