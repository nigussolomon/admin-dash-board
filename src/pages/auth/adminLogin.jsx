import React, { useState } from "react";
import logo_alt from "../../assets/logo_alt.svg";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  Snackbar,
  Alert,
} from "@mui/material";
import "../../assets/variables.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock";
import ForgotPasswordDialog from "../../components/forgotPassword";

export default function AdminLoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleResetPassword = (email) => {
    handleDialogClose();
    setAlertOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    if (email === "admin@admin.com" && password === "admin") {
      localStorage.setItem("token", "sometoken");
      localStorage.setItem("isAdmin", "true");
      setTimeout(() => {
        setLoad(false);
        return navigate("/home");
      }, 1500);
    }
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{ width: "100%", fontFamily: "var(--font)" }}
        >
          Password reset instructions sent to your email!
        </Alert>
      </Snackbar>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          gap: "1rem",
          padding: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <img
          style={{ width: "280px", height: "150px" }}
          src={logo_alt}
          alt="logo_alt"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            maxWidth: "400px",
            fontFamily: "var(--font)",
          }}
          autoComplete="off"
          InputProps={{
            styles: {
              root: {
                "&$focused": { outline: "none", fontFamily: "var(--font)" },
              },
            },
            disableUnderline: true,
            autoComplete: "off",
            endAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            maxWidth: "400px",
            fontFamily: "var(--font)",
          }}
          autoComplete={false}
          InputProps={{
            autoComplete: "new-password",
            styles: {
              root: {
                "&$focused": { outline: "none", fontFamily: "var(--font)" },
              },
            },
            disableUnderline: true,
          }}
        />
        <LoadingButton
          loading={load}
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#541718",
            padding: "1rem",
            fontFamily: "var(--font)",
            "&:hover": { backgroundColor: "#541718" },
            "&:focus": { backgroundColor: "#541718" },
          }}
        >
          Login
        </LoadingButton>
        <Button
          onClick={handleDialogOpen}
          sx={{ textTransform: "none", fontFamily: "var(--font)" }}
          variant="text"
        >
          <LockIcon /> Forgot your password?
        </Button>
      </form>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <ForgotPasswordDialog
          resetEmail={email}
          open={dialogOpen}
          onClose={handleDialogClose}
          onResetPassword={handleResetPassword}
        />
      </Dialog>
    </>
  );
}
