import React, { useState } from "react";
import logo_alt from "../../assets/logo_alt.svg";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import { Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { adminFilterTraining } from "../../services/api";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Block() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const tempData = await adminFilterTraining(
      "q[employee_id_eq]=" + decoded["employee_id"]
    );
    setData(tempData);
    setLoading(false);
  };

  if (loading) {
    setTimeout(async () => {
      await fetch();
    }, 50);
    return (
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
            animation: "pulsate 1s ease-in-out infinite",
          }}
          src={logo_alt}
          alt="logo_alt"
        />
      </Box>
    );
  } else {
    return (
      <div
        className="whole"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <>
          <div
            className="block"
            style={{
              width: "100%",
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
              You have succesfuly submitted training titles as per your interest{" "}
              <br /> we will contact you soon with the details, thank you!
            </h2>
            <h3>-Talent Development Directorate</h3>
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

          <div className="trainings">
            <Box
              sx={{
                marginTop: "5vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {data.length > 0 ? (
                <>
                  <h2>{decoded["name"]}'s Training List</h2>
                  <Divider />
                  <List>
                    {data.map((item) => (
                      <>
                        <ListItem key={item.id}>
                          <ListItemText
                            sx={{
                              fontFamily: "var(--font)",
                              fontSize: "150px",
                              textAlign: "center",
                            }}
                            primary={item.training.training_title}
                            secondary={item.season}
                          />
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                </>
              ) : null}
            </Box>
          </div>
        </>
      </div>
    );
  }
}
