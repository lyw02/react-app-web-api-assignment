import React, { useState, forwardRef, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MaterailAlert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { AuthContext } from "../contexts/authContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MaterailAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserProfilePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState();
  const [status, setStatus] = useState();

  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await context.signout();
      setStatus("success");
      setStatusMessage("Success.");
      setIsAlertOpen(true);
      navigate("/", { replace: true });
    } catch {
      setStatus("error");
      setStatusMessage("Failed to logout.");
      setIsAlertOpen(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
  };

  return (
    <>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={status}
          sx={{ width: "100%" }}
        >
          {statusMessage}
        </Alert>
      </Snackbar>
      <Card sx={{ width: "50%", margin: "auto", marginTop: "20px" }}>
        <CardContent>
          <Stack direction="column" justifyContent="center">
            <Typography
              variant="h5"
              sx={{
                justifyContent: "center",
                margin: "20px",
                textAlign: "center",
              }}
            >
              PROFILE
            </Typography>
            {context.isAuthenticated ? (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">Username</Typography>
                <Typography variant="subtitle1">
                  {context.userName}
                </Typography>
              </Stack>
            ) : (
              <Typography variant="subtitle1" textAlign="center">
                Please{" "}
                <Link component={RouterLink} to="/login" underline="none">
                  log in
                </Link>
                .
              </Typography>
            )}
            <Stack direction="row" justifyContent="center" spacing={5}>
              <Button
                onClick={handleLogOut}
                disabled={!context.isAuthenticated}
              >
                LOG OUT
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
