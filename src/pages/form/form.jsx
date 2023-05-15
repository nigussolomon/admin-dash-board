import React, { useState } from "react";
import "../../assets/variables.css";
import NavBar from "../../components/navBar/navBar";
import { createTrainings } from "../../services/constants";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import DataTable from "../../components/trainingTable/trainingTable";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { fetchCategories } from "../../services/api";
import { filterTraining } from "../../services/api";
import "./form.css";
import logo_alt from "../../assets/logo_alt.svg";

export default function Form() {
  const [selection, setSelection] = useState("");
  const [fullLoad, setFullLoad] = useState(true);
  const [CATEGORY, setCATEGORY] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState([]);
  const [childrenSelection, setChildrenSelection] = useState();
  const [trainings, setTrainings] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState(
    Array.from({ length: trainings.length }, () => "Summer")
  );

  console.log(localStorage.getItem("tempEmail"));

  const handleSubmit = async (sub) => {
    setLoading(true);
    const tempTrainings = [];
    console.log(sub);
    const data = await filterTraining(sub);

    await data.forEach((train) => {
      console.log(train.training_title);
      tempTrainings.push(
        createTrainings(
          train["id"],
          train["category"]["id"],
          train.training_title,
          "test"
        )
      );
    });
    await setTrainings(tempTrainings);
    await setSelectedSeasons(
      Array.from({ length: tempTrainings.length }, () => "Summer")
    );
    setLoading(false);
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

  const textStyle = {
    minWidth: "49%",
    marginBottom: "20px",
  };

  const iprops = {
    style: { fontFamily: "var(--font)" },
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
    await setChildrenSelection('');
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
          style={{ width: "280px", height: "150px", animation: 'pulsate 3s ease-in-out infinite' }}
          src={logo_alt}
          alt="logo_alt"
        />
        </Box>
      )
    );
  } else {
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
                  await handleSubmit(e.target.value);
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
              <div 
                className="subButton"
                style={{
                  display: "none",
                  justifyContent: "flex-end",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={async () => {
                    await setTrainings([]);
                    await setSelection(categories[0].value);
                    const tempChildren = [];
                    await CATEGORY.forEach((cat) => {
                      console.log(cat.ancestry === categories[0].value.toString());
                      if (cat.ancestry === categories[0].value.toString()) {
                        tempChildren.push({
                          value: cat.id,
                          label: cat.name,
                        });
                      }
                    });
                    await setChildren(tempChildren);
                    await setChildrenSelection(tempChildren[0].value);
                  }}
                  sx={{ padding: "10px", minWidth: "180px" }}
                  variant="contained"
                  color="error"
                  endIcon={<ClearIcon />}
                >
                  CLEAR
                </Button>
                <div className="space"></div>

                <Button
                  onClick={handleSubmit}
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
        {trainings.length > 0 ? (
          <Container maxWidth="xl">
            <div className="trainingTable">
              <DataTable
                rows={trainings}
                loading={loading}
                selectedSeasons={selectedSeasons}
                setSelectedSeasons={setSelectedSeasons}
              ></DataTable>
            </div>
          </Container>
        ) : trainings.length === 0 && loading === true ? (
          <Container maxWidth="xl">
            <Box>
              <Skeleton sx={{ height: "8vh" }} />
              <Skeleton sx={{ height: "8vh" }} />
              <Skeleton sx={{ height: "8vh" }} animation="wave" />
              <Skeleton sx={{ height: "8vh" }} animation="wave" />
            </Box>
          </Container>
        ) : null}
      </>
    );
  }
}
