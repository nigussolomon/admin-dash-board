import React from "react";
import "./home.css";
import "../variables.css";
import NavBar from "../components/navBar/navBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DataTable from "../components/table/table";

const textStyle = {
  minWidth: "48%",
  marginBottom: "20px",
};

const iprops = {
  style: { fontFamily: "var(--font)" },
};

const currencies = [
  {
    value: "DEPARTMENT",
    label: "DEPARTMENT",
  },
  {
    value: "REGION",
    label: "REGION",
  },
  {
    value: "TRAINING TITLE",
    label: "TRAINING TITLE",
  },
];

export default function Home() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <div className="filters">
          <TextField
            sx={textStyle}
            InputProps={iprops}
            InputLabelProps={iprops}
            FormHelperTextProps={iprops}
            select
            label="TRAINING TITLE"
            defaultValue="TRAINING TITLE"
            helperText="Please select training title"
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
            label="REGION"
            defaultValue="REGION"
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
            defaultValue="DEPARTMENT"
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
      </Container>
      <Container maxWidth="xl">
        <div className="dataTable">
          <DataTable></DataTable>
        </div>
      </Container>
    </div>
  );
}