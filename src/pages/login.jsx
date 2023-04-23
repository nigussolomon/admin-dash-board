import React, { useState } from 'react';
import logo_alt from '../logo_alt.svg';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
	const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
		navigate("/home")
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '1rem', padding: '1rem' }} onSubmit={handleSubmit}>
      <img style={{ width: '280px', height: '150px' }} src={logo_alt} alt="logo_alt" />
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', maxWidth: '400px' }} InputProps={{ styles: { root: { '&$focused': { outline: 'none' } } }, disableUnderline: true }} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', maxWidth: '400px' }} InputProps={{ styles: { root: { '&$focused': { outline: 'none' } } }, disableUnderline: true }} />
      <Button variant="contained" color="primary" type="submit" sx={{ width: '100%', maxWidth: '400px', backgroundColor: '#541718', padding: '1rem','&:hover': { backgroundColor: '#541718' }, '&:focus': { backgroundColor: '#541718' } }}>Login</Button>
    </form>
  );
}