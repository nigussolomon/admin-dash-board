import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import "../assets/variables.css";

export default function ForgotPasswordDialog({
  open,
  onClose,
  onResetPassword,
  resetEmail,
}) {
  const [email, setEmail] = useState(resetEmail);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <Dialog sx={{ fontFamily: "var(--font)" }} open={open} onClose={onClose}>
      <DialogTitle sx={{ fontFamily: "var(--font)" }}>
        Reset Your Password
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleResetPassword}>
          <DialogContentText sx={{ fontFamily: "var(--font)" }}>
            Enter your email address below and we'll send you a link to reset
            your password.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />

          <Button
            sx={{ fontFamily: "var(--font)" }}
            color="primary"
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
