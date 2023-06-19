import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { adminFilterTraining } from "../services/api";
import Box from "@mui/material/Box";
import logo_alt from "../assets/logo_alt.svg";
import jwt_decode from "jwt-decode";

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return true;
  } else {
    return false;
  }
}

async function canApply() {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const pass = await adminFilterTraining(
    "q[employee_id_eq]=" + decodedToken["employee_id"]
  );

  if (pass.length >= 3 && decodedToken['role'] !== 'admin') {
    return false;
  } else {
    return true;
  }
}

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  if (isAuthenticated() === false) {
    return <Navigate to="/" replace />;
  }

  if (load === false) {
    return (
      setTimeout(async () => {
        const pass = await canApply();
        if (pass === false) {
          return navigate("/blocked");
        } else {
          setLoad(true);
        }
      }, 0),
      (
        <Box
          sx={{
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
              animation: "pulsate 3s ease-in-out infinite",
            }}
            src={logo_alt}
            alt="logo_alt"
          />
        </Box>
      )
    );
  } else {
    return children;
  }
};
export default Protected;
