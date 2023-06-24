import React, { useState } from "react";
import "../../assets/variables.css";
import NavBar from "../../components/navBar/navBar";
import { createTrainings, seasons } from "../../services/constants";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import DataTable from "../../components/trainingTable/trainingTable";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { fetchCategories } from "../../services/api";
import { filterTraining, filterTraining1 } from "../../services/api";
import { newTraining } from "../../services/api";
import { postTraining } from "../../services/api";
import "./form.css";
import logo_alt from "../../assets/logo_alt.svg";
import jwt_decode from "jwt-decode";
import { Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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
    Array.from({ length: trainings.length }, () => "1st Quarter")
  );
  const [toggleOther, setToggleOther] = useState("none");
  const [customTraining, setCustomTraining] = useState("");
  const [season, setSeason] = useState("1st Quarter");
  const [customTrainingsAmount, setCustomTrainingsAmount] = useState(0);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertPriority, setAlertPriority] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [submitNewTraining, setSubmitNewTraining] = useState(false);
  const [page, setPage] = useState(0);
  const [otherTraining, setOtherTraining] = useState([])

  const submitOtherTraining = async () => {
    setSubmitNewTraining(true)
    const trainingAdded = await newTraining({
      training_title: customTraining,
      training_type: categories.filter(
        (child) => child.value === selection
      )[0]["label"],
      category_id: childrenSelection,
    });

    if (trainingAdded !== null) {
      await postTraining({
        training_id: trainingAdded,
        season: season,
        employee_id: decodedToken["employee_id"],
      });

      if (postTraining) {
        setCustomTrainingsAmount(customTrainingsAmount + 1);
        localStorage.setItem(
          "trainings",
          customTrainingsAmount + 1
        );
        setAlertMessage("Training added successfully");
        setAlertPriority("success");
        setAlertOpen(true);
        setSubmitNewTraining(false);
        setToggleOther('none')
      } else {
        setAlertMessage(
          "Training not added, please try again"
        );
        setAlertOpen(true);
        setSubmitNewTraining(false);
      }
    }
  }


  function handleClose() {
    setAlertOpen(false);
  }

  const handleSubmit = async (sub) => {
    setLoading(true);
    const tempTrainings = [];
    console.log(sub);
    const data = await filterTraining(sub);

    await data.forEach((train) => {
      console.log(train.training_title);
      tempTrainings.push(
        createTrainings(
          train['id'],
          train["category_id"],
          train.training_title,
          "test"
        )
      );
    });
    await setTrainings(tempTrainings);
    await setSelectedSeasons(
      Array.from({ length: tempTrainings.length }, () => "1st Quarter")
    );
    setLoading(false);
  };

  const handleSubmit1 = async (sub) => {
    setLoading(true);
    const tempTrainings = [];
    console.log(sub);
    const data = await filterTraining1(sub);

    await data.forEach((train) => {
      console.log(train.training_title);
      tempTrainings.push(
        createTrainings(
          train['id'],
          train["category_id"],
          train.training_title,
          "test"
        )
      );
    });
    await setTrainings(tempTrainings);
    await setSelectedSeasons(
      Array.from({ length: tempTrainings.length }, () => "1st Quarter")
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
    // await setSelection(tempCat[0].value);
    // setChildren(tempChildren);
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
    setPage(0)
    setToggleOther("none");
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
    await handleSubmit1(e.target.value);
  };

  if (fullLoad) {
    return (
      setTimeout(async () => {
        await fetchData();
        setFullLoad(false);
        if(parseInt(localStorage.getItem("trainings")) === 1 && parseInt(localStorage.getItem('totalTrainings')) !== 0){
          localStorage.setItem("totalTrainings", parseInt(localStorage.getItem('totalTrainings')) - 1)
        }
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
              animation: "pulsate 3s ease-in-out infinite",
            }}
            src={logo_alt}
            alt="logo_alt"
          />
        </Box>
      )
    );
  } else {
    return (
      <>
        <NavBar disabledForm={true}/>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alertOpen}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertPriority}
            sx={{ width: "100%", fontFamily: "var(--font)" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
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
                  setPage(0)
                  console.log(e.target.value);
                  await setChildrenSelection(e.target.value);
                  console.log(
                    children.filter((child) => child.value === e.target.value)
                  );
                  if (
                    children.filter(
                      (child) => child.value === e.target.value
                    )[0]["label"] === "Other"
                  ) {
                    setToggleOther("flex");
                  } else {
                    setToggleOther("none");
                    await handleSubmit(e.target.value);
                  }
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
                  display: toggleOther,
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  onChange={(e) => {
                    setCustomTraining(e.target.value);
                  }}
                  sx={{
                    minWidth: "42%",
                  }}
                  InputProps={iprops}
                  InputLabelProps={iprops}
                  FormHelperTextProps={iprops}
                  label="NEW TRAINING"
                  value={customTraining}
                  defaultValue={customTraining}
                ></TextField>
                <div className="space"></div>
                <TextField
                  onChange={(e) => {
                    setSeason(e.target.value);
                  }}
                  sx={{
                    minWidth: "42%",
                  }}
                  InputProps={iprops}
                  InputLabelProps={iprops}
                  FormHelperTextProps={iprops}
                  select
                  label="PICK A QUARTER"
                  value={season}
                  defaultValue={season}
                >
                  {seasons.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="space"></div>
                <div className="button">
                  <LoadingButton
                    loading={submitNewTraining}
                    onClick={async () => {
                      if (customTrainingsAmount < 1) {
                        setSubmitNewTraining(true);
                        await submitOtherTraining()
                        await setOtherTraining([{
                          training_title: customTraining,
                          season: season
                        }])
                        setSubmitNewTraining(false)
                        setToggleOther('none')
                        
                      } else {
                        setAlertMessage("You can add one custom training");
                        setAlertPriority("error");
                        setAlertOpen(true);
                        setSubmitNewTraining(false);
                        setToggleOther('none')
                      }
                    }}
                    sx={{ padding: "14px", minWidth: "120px" }}
                    variant="contained"
                    color="success"
                  >
                    ADD
                  </LoadingButton>
                </div>
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
                customTrainingsAmount={customTrainingsAmount}
                page={page}
                setPage={setPage}
                otherTraining={otherTraining}
                setOtherTraining={setOtherTraining}
                submitNewTraining={submitNewTraining}
                submitOtherTraining={submitOtherTraining}
                setCustomTrainingsAmount={setCustomTrainingsAmount}
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
