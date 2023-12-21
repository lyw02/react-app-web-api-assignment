import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const stackStyle = {
  margin: "10px",
};

const chipStyle = { margin: "3px" };

const InfoEntry = ({
  label,
  icon = null,
  data = null,
  iterExpression = null,
  handleExpression = null,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ ...stackStyle }}
    >
      <Chip label={label} sx={{ ...chipStyle }} color="primary" />
      {iterExpression ? (
        iterExpression
      ) : handleExpression ? (
        <Chip label={handleExpression()} sx={{ ...chipStyle }} />
      ) : icon ? (
        <Chip label={data} icon={icon} sx={{ ...chipStyle }} />
      ) : (
        <Chip label={data} sx={{ ...chipStyle }} />
      )}
    </Stack>
  );
};

export default InfoEntry;
