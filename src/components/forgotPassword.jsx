import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import "../assets/variables.css";

export default function ForgotPasswordDialog({ open, onClose, onResetPassword, resetEmail }) {
  const [email, setEmail] = useState(resetEmail);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = () => {
    onResetPassword(email);
    setEmail("");
  };

  return (
    <Dialog sx={{fontFamily: 'var(--font)'}} open={open} onClose={onClose}>
      <DialogTitle sx={{fontFamily: 'var(--font)'}}>Reset Your Password</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{fontFamily: 'var(--font)'}}>
          Enter your email address below and we'll send you a link to reset your
          password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{fontFamily: 'var(--font)'}} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button sx={{fontFamily: 'var(--font)'}} onClick={handleResetPassword} color="primary">
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};


