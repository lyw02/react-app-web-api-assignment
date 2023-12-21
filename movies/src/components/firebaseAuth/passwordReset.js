import React, { useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MaterailAlert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useAuth } from "../../contexts/authContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MaterailAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isBackdropOpen, setIsBackdropOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState();
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setStatusMessage("Please fill in the information.");
      setStatus("error");
      setIsAlertOpen(true);
    } else {
      try {
        setIsLoading(true);
        await resetPassword(email);
        setIsLoading(false);
        setStatusMessage("Email sent. Please check your inbox.");
        setStatus("success");
        setIsAlertOpen(true);
      } catch {
        setStatusMessage("Failed to send reset email.");
        setStatus("error");
        setIsAlertOpen(true);
        setIsLoading(false);
      }
    }
  };

  const handleBackdropClose = () => {
    setIsBackdropOpen(false);
    navigate("/", { replace: true });
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
      <Backdrop open={isBackdropOpen} onClick={handleBackdropClose}>
        <Card
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{ width: "30%", margin: "auto" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                justifyContent: "center",
                margin: "20px",
                textAlign: "center",
              }}
            >
              PASSWORD RESET
            </Typography>
            <Stack
              direction="column"
              sx={{ justifyContent: "center", padding: "10px" }}
            >
              <TextField
                label="Email"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ margin: "10px" }}
              >
                SEND RESET EMAIL
              </Button>
              <Typography
                variant="body2"
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <Link component={RouterLink} to="/login" underline="none">
                  Log In
                </Link>
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Don't have an account?{" "}
              <Link component={RouterLink} to="/signup" underline="none">
                Sign up
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>
      </Backdrop>
    </>
  );
}
