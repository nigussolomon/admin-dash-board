import React, { useState } from "react";
import "../../assets/variables.css";
import NavBar from "../../components/navBar/navBar";
import { samples, trainings, currencies } from "../../services/constants";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import DataTable from "../../components/trainingTable/trainingTable";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import "./form.css";

export default function Form() {
  const [selection, setSelection] = useState("IT and Technical Skills");

  const textStyle = {
    minWidth: "49%",
    marginBottom: "20px",
  };

  const iprops = {
    style: { fontFamily: "var(--font)" },
  };

  const categoryChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <h1 style={{ marginBottom: "2px" }}>TRAINING NEED ASSESMENT </h1>
        <h3 style={{ marginTop: 0, fontWeight: "400" }}>
          PICK A TRAINING YOU WANT TO TAKE{" "}
        </h3>
        <Divider />
        <div className="userForm">
          <div className="questionnaire">
            <TextField
              onChange={categoryChange}
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              label="TRAINING CATEGORY"
              defaultValue={currencies[0].value}
              helperText="Please select training category"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              label="SUB CATEGORY"
              helperText="Please select a sub category"
            >
              {trainings[selection].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <div
              className="subButton"
              style={{
                justifyContent: "flex-end",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Button
                sx={{ padding: "10px", minWidth: "180px" }}
                variant="contained"
                color="error"
                endIcon={<ClearIcon />}
              >
                CLEAR
              </Button>
              <div className="space"></div>
              <Button
                sx={{ padding: "10px", minWidth: "180px" }}
                variant="contained"
                color="success"
                endIcon={<FilterListIcon />}
              >
                FILTER
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div className="trainingTable">
          <DataTable rows={samples[0]} loading={false}></DataTable>
        </div>
      </Container>
    </>
  );
}
