import * as React from "react";
import logo from "../../assets/logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import "./nav.css";

export default function NavBar() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/")
  };
  return (
    <>
      <AppBar
        sx={{ backgroundColor: "var(--primary-color)", boxShadow: "none" }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className="logo">
              <img src={logo} alt="bunnaBank" />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        sx={{ backgroundColor: "var(--white)", boxShadow: "none" }}
        className="nav"
        position="static"
      >
        <Container maxWidth="xl" sx={{display: 'flex', height: "35px", justifyContent: 'flex-end' ,alignItems: 'right',}}>
          <Toolbar disableGutters>
          <Button onClick={handleSubmit}lick variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#541718', '&:hover': { backgroundColor: '#541718' }, '&:focus': { backgroundColor: '#541718' } }} endIcon={<LogoutIcon />}>Logout</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
