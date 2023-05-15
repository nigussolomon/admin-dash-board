import React, { useState } from "react";
import logo_alt from "../../assets/logo_alt.svg";
import { TextField, InputAdornment, Snackbar, Alert } from "@mui/material";
import "../../assets/variables.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { verifyAuthenticate } from "../../services/api.js";

export default function OtpScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState(
    "A One Time Password for authentication has been sent to your email check your email and enter it here to continue, please don't share your code with anyone as it is confidential and only for your eyes!"
  );
  const [alertPriority, setAlertPriority] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setAlertOpen(false);
    const yes = await verifyAuthenticate(
      otp
    );
    if (yes === true) {
      localStorage.setItem("isAdmin", "false");
      setTimeout(() => {
        setLoad(false);
        return navigate("/form");
      }, 1500);
    } else {
      setAlertPriority('error')
      setAlertOpen(true);
      setLoad(false);
      setAlertMessage('The otp you entered is incorrect please check your email and try again!')
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
          severity={alertPriority}
          sx={{ width: "100%", fontFamily: "var(--font)" }}
        >
          {alertMessage}
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
          label="OTP"
          type="password"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
          AUTHENTICATE
        </LoadingButton>
      </form>
    </>
  );
}