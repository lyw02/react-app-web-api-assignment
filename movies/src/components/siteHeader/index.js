import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElTrending, setAnchorElTrending] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    {
      label: "Trending",
      children: [
        { label: "Day", path: "/movies/trending/day" },
        { label: "Week", path: "/movies/trending/week" },
      ],
    },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTrendingTimeWindow = (event) => {
    setAnchorElTrending(event.currentTarget);
  };

  const handleCloseTrending = () => {
    setAnchorElTrending(null);
  };

  const getMenu = () => {
    return menuOptions.map((opt) =>
      !opt.children ? (
        <Button
          key={uuidv4()}
          color="inherit"
          onClick={() => handleMenuSelect(opt.path)}
        >
          {opt.label}
        </Button>
      ) : (
        <Box key={opt.label}>
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleTrendingTimeWindow}
          >
            {opt.label}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorElTrending}
            keepMounted
            open={Boolean(anchorElTrending)}
            onClose={handleCloseTrending}
          >
            {opt.children.map((c) => (
              <MenuItem
                key={uuidv4()}
                onClick={() => {
                  handleMenuSelect(c.path);
                  handleCloseTrending();
                }}
              >
                {c.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )
    );
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {getMenu()}
              </Menu>
            </>
          ) : (
            <>{getMenu()}</>
          )}
          <Link to={currentUser ? "/user" : "/signup"}>
            <Button sx={{ color: "white" }}>
              <AccountCircleIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
