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
import { fetchEmployees } from "../../services/api";
import { writeFile, utils } from "xlsx";

const textStyle = {
  minWidth: "48%",
  marginBottom: "20px",
};

const iprops = {
  style: { fontFamily: "var(--font)" },
};

export default function Home() {
  const [state, setState] = useState(0);
  const [selection, setSelection] = useState("");
  const [fullLoad, setFullLoad] = useState(true);
  const [CATEGORY, setCATEGORY] = useState([]);
  const [categories, setCategories] = useState([]);
  const [children, setChildren] = useState([]);
  const [childrenSelection, setChildrenSelection] = useState("");
  const [season, setSeason] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [region, setRegion] = useState("");
  const [dept, setDept] = useState("");
  const [uniqDept, setUniqDept] = useState([]);
  const [uniqLoc, setUniqLoc] = useState([]);
  const [disableExport, setDisableExport] = useState(true);

  const columns = [
    { id: 'id', label: 'Employee ID', minWidth: 90 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'department', label: 'Department', minWidth: 170, },
    { id: 'region', label: 'Region', minWidth: 170, },
    { id: 'trainingTitle', label: 'Training Title', minWidth: 170, },
    { id: 'date', label: 'Date', minWidth: 170, },
  ];

  function convertToWorkbook(rows, columns) {
    const worksheet = utils.json_to_sheet(rows);
    const header = columns.map((c) => c.label);
    utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  }

  function extractUniqueDepartments(responses) {
    const uniqueDepartments = [];
    const uniqueRegions = [];

    responses.forEach((response) => {
      const department = response.department;
      const location = response.location;
      const existingDepartment = uniqueDepartments.find(
        (dep) => dep.value === department
      );
      const existingLocation = uniqueRegions.find(
        (dep) => dep.value === location
      );
      if (!existingDepartment) {
        uniqueDepartments.push({
          value: department,
          label: department,
        });
      }
      if (!existingLocation) {
        uniqueRegions.push({
          value: location,
          label: location,
        });
      }
    });
    setUniqDept(uniqueDepartments);
    setUniqLoc(uniqueRegions);
  }

  function filterData(data, quarter, location, department, category_id) {
    if (quarter && location && department && category_id) {
      return true;
    } else {
      return data.filter((item) => {
        if (quarter && item.season !== quarter) {
          return false;
        }

        if (location && item.employee.location !== location) {
          return false;
        }

        if (department && item.employee.department !== department) {
          return false;
        }

        if (category_id && item.training.category_id !== category_id) {
          return false;
        }

        return true;
      });
    }
  }

  const clear = () => {
    setDept(null);
    setRegion(null);
    setSeason(null);
    setChildrenSelection(null);
    setRows([]);

    console.log(region);
    console.log(dept);
  };

  const categoryChange = async (e) => {
    await setSelection(e.target.value);
    const tempChildren = [];
    await CATEGORY.forEach((cat) => {
      console.log(cat.ancestry === e.target.value.toString());
      if (cat.ancestry === e.target.value.toString()) {
        tempChildren.push({
          value: cat.id,
          label: cat.name,
        });
      }
    });
    await setChildren(tempChildren);
    await setChildrenSelection("");
  };

  const handleSubmit = async () => {
    setDisable(true);
    setLoading(true);
    setDisableExport(true)
    const tempTrainings = [];
    const data = await adminFilterTraining("");
    const filteredData = await filterData(
      data,
      season,
      region,
      dept,
      childrenSelection
    );

    await filteredData.forEach((train) => {
      console.log(train);
      tempTrainings.push(
        createData(
          train["employee"]["id"],
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
    setDisableExport(false)
  };

  const fetchData = async () => {
    const data = await fetchCategories();
    const emp = await fetchEmployees();
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
    await extractUniqueDepartments(emp);
    // await setSelection(tempCat[0].value);
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
        <NavBar disabledDash={true} />
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
              {uniqLoc.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              onChange={async (e) => {
                await setDept(e.target.value);
              }}
              sx={textStyle}
              InputProps={iprops}
              InputLabelProps={iprops}
              FormHelperTextProps={iprops}
              select
              value={dept}
              defaultValue={null}
              label="DEPARTMENT"
              helperText="Please select a department"
            >
              {uniqDept.map((option) => (
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
            <div className="dataTable">
            <Divider/>
              <div
                className="title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>TRAINEE LIST</h2>
                <Button
                  variant="contained"
                  disabled={disableExport}
                  color="success"
                  sx={{
                    padding: ".5%",
                    paddingLeft: "2%",
                    paddingRight: "2%",
                    margin: "1%",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                  onClick={async () => {
                    await setDisableExport(true)
                    const workbook = await convertToWorkbook(rows, columns);
                    setTimeout(async () => {
                      await writeFile(workbook, "trainingData.xlsx");
                      setDisableExport(false)
                    }, 50);
                    
                  }}
                >
                  Export to Excel
                </Button>
              </div>
              <Divider />
              <br />
              <DataTable rows={rows} loading={loading} columns={columns}></DataTable>
            </div>
          </Container>
        )}
      </div>
    );
  }
}
