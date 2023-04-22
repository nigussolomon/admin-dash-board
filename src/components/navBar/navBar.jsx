import * as React from "react";
import logo from "../../logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import "./nav.css";

export default function NavBar() {
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
        <Container maxWidth="xl" sx={{ height: "25px" }}>
          <Toolbar disableGutters>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
