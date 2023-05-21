import React, { useState } from "react";
import "./home.css";
import "../../assets/variables.css";
import NavBar from "../../components/navBar/navBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/table/table";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { regions, seasons, createData } from "../../services/constants";
import logo_alt from "../../assets/logo_alt.svg";
import { fetchCategories } from "../../services/api";
import { adminFilterTraining } from "../../services/api";
import Skeleton from "@mui/material/Skeleton";

const textStyle = {
  minWidth: "48%",
  marginBottom: "20px",
};

const iprops = {
  style: { fontFamily: "var(--font)" },
};

export default function Home() {
  const [selection, setSelection] = useState("");
  const [fullLoad, setFullLoad] = useState(true);
  const [CATEGORY, setCATEGORY] = useState([]);
  const [categories, setCategories] = useState([]);
  const [children, setChildren] = useState([]);
  const [childrenSelection, setChildrenSelection] = useState();
  const [season, setSeason] = useState();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [region, setRegion] = useState();

  function clear() {
    setRows([]);
  }

  const categoryChange = (e) => {
    setSelection(e.target.value);
  };

  const handleSubmit = async () => {
    setDisable(true);
    setLoading(true);
    const tempTrainings = [];
    const data = await adminFilterTraining("q[season_eq]=" + season);

    await data.forEach((train) => {
      console.log(train);
      tempTrainings.push(
        createData(
          train["employee"]["full_name"],
          train["employee"]["email"],
          train["employee"]["department"],
          train["employee"]["location"],
          train["training"]["training_title"],
          train["season"]
        )
      );
    });
    await setRows(tempTrainings);
    setLoading(false);
    setDisable(false);
  };

  const fetchData = async () => {
    const data = await fetchCategories();
    setCATEGORY(data);
    const tempCat = [];
    const tempChildren = [];
    data.forEach((cat) => {
      if (cat.ancestry === null) {
        tempCat.push({
          value: cat.id,
          label: cat.name,
        });
      }
      if (cat.ancestry === "1") {
        tempChildren.push({
          value: cat.id,
          label: cat.name,
        });
      }
    });
    await setSelection(tempCat[0].value);
    setChildren(tempChildren);
    setCategories(tempCat);
  };

  if (fullLoad) {
    return (
      setTimeout(async () => {
        await fetchData();
        setFullLoad(false);
      }, 50),
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
              animation: "pulsate 1s ease-in-out infinite",
            }}
            src={logo_alt}
            alt="logo_alt"
          />
        </Box>
      )
    );
  } else {
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
              value={selection}
              defaultValue={selection}
              helperText="Please select training category"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              onChange={async (e) => {
                console.log(e.target.value);
                await setChildrenSelection(e.target.value);
              }}
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              value={childrenSelection}
              defaultValue={null}
              label="SUB CATEGORY"
              helperText="Please select a sub category"
            >
              {children.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              onChange={async (e) => {
                await setSeason(e.target.value);
              }}
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              value={season}
              label="QUARTER"
              helperText="Please select a quarter"
            >
              {seasons.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              onChange={async (e) => {
                await setRegion(e.target.value);
              }}
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              value={region}
              defaultValue={null}
              label="REGION"
              helperText="Please select a region"
            >
              {regions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
              onClick={handleSubmit}
              disabled={disable}
              sx={{ padding: "12px", minWidth: "180px" }}
              variant="contained"
              color="success"
              endIcon={<FilterListIcon />}
            >
              FILTER
            </Button>
          </div>
        </Container>
        {rows.length === 0 && loading === false ? (
          <Container maxWidth="xl">
          <Divider />
          <div className="dataTable">
            <h2>TRAINEE LIST</h2>
            <Divider />
            <h3>No trainees available!</h3>
          </div>
        </Container>
        ) : (
          <Container maxWidth="xl">
            <Divider />
            <div className="dataTable">
              <h2>TRAINEE LIST</h2>
              <Divider />
              <DataTable rows={rows} loading={loading}></DataTable>
            </div>
          </Container>
        )}
      </div>
    );
  }
}
