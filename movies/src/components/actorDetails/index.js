import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { excerpt } from "../../util";
import InfoEntry from "../infoEntry";
import { Link as RouterLink } from "react-router-dom";

const posterPathRoot = "https://image.tmdb.org/t/p/w780";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: "10px",
  margin: "10px",
};

const chipStyle = { margin: "3px" };

const stackStyle = {
  margin: "10px",
};

const expandButtonStyle = {
  cursor: "pointer",
  color: "blue",
};

const ActorDetails = ({ actor, cast }) => {
  // Don't miss this!
  const [isFullBiography, setIsFullBiography] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        <i>Biography</i>
      </Typography>

      <Paper className="biography">
        <Box sx={{ ...boxStyle }}>
          {actor.biography ? (
            !isFullBiography ? (
              <Typography variant="body2">
                {excerpt(actor.biography)}
                <Typography
                  variant="body2"
                  onClick={() => setIsFullBiography(true)}
                  sx={{ ...expandButtonStyle }}
                >
                  Expand
                </Typography>
              </Typography>
            ) : (
              <Typography variant="body2">
                {actor.biography}
                <Typography
                  variant="body2"
                  onClick={() => setIsFullBiography(false)}
                  sx={{ ...expandButtonStyle }}
                >
                  Fold
                </Typography>
              </Typography>
            )
          ) : (
            <Typography variant="body2">No Data</Typography>
          )}
        </Box>
      </Paper>

      <Typography variant="h5" component="h3">
        <i>Personal Info</i>
      </Typography>

      <Paper className="personal-info">
        <Box>
          <Stack direction="column">
            {actor.also_known_as.length !== 0 && (
              <InfoEntry
                label="Also known as"
                iterExpression={actor.also_known_as.map((aka) => {
                  return <Chip label={aka} sx={{ ...chipStyle }} />;
                })}
              />
            )}
            {actor.birthday && (
              <InfoEntry label="Birthday" data={actor.birthday} />
            )}
            {actor.gender && (
              <InfoEntry
                label="Gender"
                handleExpression={() => {
                  switch (actor.gender) {
                    case 0:
                      return "Unknown";
                    case 1:
                      return "Female";
                    case 2:
                      return "Male";
                    case 3:
                      return "None binary";
                    default:
                      return "Unknown";
                  }
                }}
              />
            )}
            {actor.place_of_birth && (
              <InfoEntry label="Place of birth" data={actor.place_of_birth} />
            )}
            {actor.popularity && (
              <InfoEntry
                label="Popularity"
                icon={<StarRate />}
                data={actor.popularity}
              />
            )}
            {!(
              actor.also_known_as.length === 0 ||
              actor.birthday ||
              actor.gender ||
              actor.place_of_birth ||
              actor.popularity
            ) && <Typography variant="body2">No Data</Typography>}
          </Stack>
        </Box>
      </Paper>

      <Typography variant="h5" component="h3">
        <i>Acting</i>
      </Typography>

      <Paper>
        <Box
          className="acting-list-box"
          flexDirection="column"
          sx={{ ...boxStyle }}
        >
          {cast.cast ? (
            cast.cast.map((c) => {
              return (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ ...stackStyle }}
                >
                  <Link
                    component={RouterLink}
                    to={`/movies/${c.id}`}
                    underline="none"
                  >
                    <Avatar
                      alt={c.original_title}
                      src={`${posterPathRoot}${c.poster_path}`}
                      variant="square"
                      sx={{ width: 200, height: 300 }}
                    />
                  </Link>
                  <Typography variant="body2">
                    <b>
                      <Link
                        component={RouterLink}
                        to={`/movies/${c.id}`}
                        underline="none"
                      >
                        {c.original_title} ({c.release_date.substring(0, 4)})
                      </Link>
                    </b>
                  </Typography>
                  <Typography variant="body2">
                    <i>as</i>
                  </Typography>
                  <Typography variant="body2">
                    <b>{c.character}</b>
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Typography variant="body2">No Data</Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default ActorDetails;
