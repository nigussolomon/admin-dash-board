import * as React from "react";
import logo from "../../assets/logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";
import "./nav.css";
import jwt_decode from "jwt-decode";

export default function NavBar({disabledForm, disabledDash}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token != null) {
    var decodedToken = jwt_decode(token);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };
  return (
    <>
      <AppBar
        sx={{ backgroundColor: "var(--primary-color)", boxShadow: "none" }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div
              className="nav"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div className="logo">
                <img src={logo} alt="bunnaBank" />
              </div>
              <div className="user">
                <h4>
                  {decodedToken["email"]} | {decodedToken["name"]}
                </h4>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        sx={{ backgroundColor: "var(--white)", boxShadow: "none" }}
        className="nav"
        position="static"
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            height: "35px",
            justifyContent: "flex-end",
            alignItems: "right",
          }}
        >
          <Toolbar disableGutters>
            {decodedToken["role"] === "admin" ? (
              <>
                <Button
                  disabled={disabledForm == null? false : true}
                  onClick={() => navigate("/form")}
                  lick
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": { backgroundColor: "var(--primary-color)" },
                    "&:focus": { backgroundColor: "var(--primary-color)" },
                  }}
                  endIcon={<ListAltIcon />}
                >
                  TRAINING FORM
                </Button>
                <div className="space"></div>
                <Button
                  
                  disabled={disabledDash == null? false : true}
                  onClick={() => navigate("/home")}
                  lick
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": { backgroundColor: "var(--primary-color)" },
                    "&:focus": { backgroundColor: "var(--primary-color)" },
                  }}
                  endIcon={<DashboardIcon />}
                >
                  DASHBOARD
                </Button>
                <div className="space"></div>
              </>
            ) : null}
            <Button
              onClick={handleSubmit}
              lick
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#541718",
                "&:hover": { backgroundColor: "#541718" },
                "&:focus": { backgroundColor: "#541718" },
              }}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
