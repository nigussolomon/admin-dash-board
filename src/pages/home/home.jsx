import React, { useState } from "react";
import "./home.css";
import "../assets/variables.css";
import NavBar from "../components/navBar/navBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DataTable from "../components/table/table";
import Divider from "@mui/material/Divider";
import {samples, trainings, currencies} from '../services/constants';



const textStyle = {
  minWidth: "48%",
  marginBottom: "20px",
};

const iprops = {
  style: { fontFamily: "var(--font)" },
};

export default function Home() {
  const [selection, setSelection] = useState("TRAINING CATEGORY");
  const [rows, setRows] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  function populate() {
    if (index < samples.length) {
      setDisable(true);
      setLoading(true);
      setRows(samples[index]);
      setIndex(index + 1);
      setTimeout(() => {
        setLoading(false);
        setDisable(false);
      }, 1000);
    } else {
      setDisable(true);
      setLoading(true);
      setIndex(1);
      setRows(samples[0]);
      setTimeout(() => {
        setLoading(false);
        setDisable(false);
      }, 1000);
    }
  }

  function clear() {
    setRows([]);
    setIndex(0);
  }

  const categoryChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <h1>TRAINING NEED ASSESMENT </h1>
        <Divider />
        <div className="filters">
          <TextField
            onChange={categoryChange}
            sx={textStyle}
            InputProps={iprops}
            InputLabelProps={iprops}
            FormHelperTextProps={iprops}
            select
            label="TRAINING CATEGORY"
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
            label="TRAINING TITLE"
            helperText="Please select training title"
          >
            {trainings[selection].map((option) => (
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
            label="REGION"
            helperText="Please select region"
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
            label="DEPARTMENT"
            helperText="Please select department"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={textStyle} InputProps={iprops} />
          </LocalizationProvider>
        </div>
        <div className="subButton">
          <Button
            disabled={disable}
            onClick={clear}
            sx={{ padding: "12px", minWidth: "180px" }}
            variant="contained"
            color="error"
            endIcon={<ClearIcon />}
          >
            CLEAR
          </Button>
          <div className="space"></div>
          <Button
            disabled={disable}
            onClick={populate}
            sx={{ padding: "12px", minWidth: "180px" }}
            variant="contained"
            color="success"
            endIcon={<FilterListIcon />}
          >
            FILTER
          </Button>
        </div>
      </Container>
      <Container maxWidth="xl">
        <Divider />
        <div className="dataTable">
          <h2>TRAINEE LIST</h2>
          <DataTable rows={rows} loading={loading}></DataTable>
        </div>
      </Container>
    </div>
  );
}
