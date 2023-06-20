import React from "react";
import logo_alt from "../../assets/logo_alt.svg";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Block() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  return (
    <div
      className="block"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        style={{
          width: "280px",
          height: "150px",
        }}
        src={logo_alt}
        alt="logo_alt"
      />
      <h2 style={{ color: "var(--primary)", textAlign: "center" }}>
        You have picked the maximum amount of trainings! <br /> please contact
        your local branch adminstrator for more information.
      </h2>
      {decoded.role === "admin" ? (
        <Button
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
      ) : null}
    </div>
  );
}
