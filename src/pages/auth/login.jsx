import React, { useState, useEffect } from "react";
import logo_alt from "../../assets/logo_alt.svg";
import { TextField, InputAdornment, Snackbar, Alert } from "@mui/material";
import "../../assets/variables.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { authenticate } from "../../services/api";

const DISABLE_DURATION = 300000; // 5 minutes in milliseconds

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(DISABLE_DURATION / 1000);

  useEffect(() => {
    const timestamp = localStorage.getItem("buttonDisabledTimestamp");
    if (timestamp) {
      const diff = DISABLE_DURATION - (Date.now() - timestamp);
      if (diff > 0) {
        setDisabled(true);
        setCountdown(Math.ceil(diff / 1000));
        const intervalId = setInterval(() => {
          setCountdown((prevCountdown) => {
            const newCountdown = prevCountdown - 1;
            if (newCountdown === 0) {
              clearInterval(intervalId);
              setDisabled(false);
              localStorage.removeItem("buttonDisabledTimestamp");
            }
            return newCountdown;
          });
        }, 1000);
      } else {
        localStorage.removeItem("buttonDisabledTimestamp");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setLoad(true);
    setAlertOpen(false);
    const yes = await authenticate(email);
    console.log(yes);
    if (yes === true) {
      localStorage.setItem("tempEmail", email);
      setDisabled(true);
      setCountdown(DISABLE_DURATION / 1000);
      localStorage.setItem("buttonDisabledTimestamp", Date.now());
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          if (newCountdown === 0) {
            clearInterval(intervalId);
            setDisabled(false);
            localStorage.removeItem("buttonDisabledTimestamp");
          }
          navigate("/otp");
          return newCountdown;
        });
      }, 1000);
    } else {
      setLoad(false);
      setErrorMsg(
        "Email not found, please try with your Bunna Bank company email!"
      );
      setAlertOpen(true);
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
          severity="error"
          sx={{ width: "100%", fontFamily: "var(--font)" }}
        >
          {errorMsg}
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
                "&$focused": {
                  outline: "none",
                  fontFamily: "var(--font)",
                },
              },
            },
            autoComplete: "off",
            endAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          loading={load}
          disabled={disabled}
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "100%",
            maxWidth:"400px",
            backgroundColor: disabled ? "#999" : "#541718",
            padding: "1rem",
            fontFamily: "var(--font)",
            "&:hover": { backgroundColor: disabled ? "#999" : "#541718" },
            "&:focus": { backgroundColor: disabled ? "#999" : "#541718" },
          }}
        >
          {disabled ? `Please wait ${countdown}s` : "SEND OTP"}
        </LoadingButton>
      </form>
    </>
  );
}