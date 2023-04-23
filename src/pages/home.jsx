import React, {useState} from "react";
import "./home.css";
import "../assets/variables.css";
import NavBar from "../components/navBar/navBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DataTable from "../components/table/table";

function createData(name, email, department, region, trainingTitle, date) {
  return { name, email, department, region, trainingTitle, date };
}

const samples = [
  [
    createData("Nigus Solomon","nigus.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hemen Solomon","hemen.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hawani Hashim","hawani.hashim@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Eyosias Mekbib","eyosias.mekbib@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Kaleab Anteneh","kaleab.anteneh@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Yeabsera Seyoum","yeabsera.seyoum@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Aklog Sirak","aklog.sirak@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
  ],

  [
    createData("Nigus Solomon","nigus.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hemen Solomon","hemen.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hawani Hashim","hawani.hashim@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
  ],

  [
    createData("Nigus Solomon","nigus.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hemen Solomon","hemen.solomon@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Hawani Hashim","hawani.hashim@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
    createData("Yeabsera Seyoum","yeabsera.seyoum@mks.com","Software Engineering","Addis Ababa","Information Management", "2023-04-23"),
  ],
]



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
  const [rows, setRows] = useState([]);
  const [index,  setIndex] = useState(0);
  function populate(){
    if (index < samples.length) {
      setRows(samples[index]);
      setIndex(index + 1);
    } else {
      setIndex(1)
      setRows(samples[0]);
    }
      
    
  }

  function clear(){ 
    setRows([]);
    setIndex(0)
  }

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <h1>TRAINING NEED ASSESMENT </h1>
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
        <div className="subButton">
          <Button onClick={clear}  sx={{padding: "12px", minWidth: "180px",}} variant="contained" color="error" endIcon={<ClearIcon/>}>CLEAR</Button>
          <div className="space"></div>
          <Button onClick={populate} sx={{padding: "12px", minWidth: "180px",}} variant="contained" color="success" endIcon={<FilterListIcon/>}>FILTER</Button>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div className="dataTable">
          <h2>TRAINEE LIST</h2>
          <DataTable rows={rows}></DataTable>
        </div>
      </Container>
    </div>
  );
}
