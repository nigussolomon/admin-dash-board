import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { seasons } from "../../services/constants";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import jwt_decode from "jwt-decode";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ClearIcon from "@mui/icons-material/Clear";
import { postTraining } from "../../services/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "title", label: "Training Title", minWidth: 370 },
  { id: "season", label: "Quarters", minWidth: 280 },
];

export default function StickyHeadTable({
  rows,
  loading,
  selectedSeasons,
  setSelectedSeasons,
  customTrainingsAmount,
  page,
  setPage
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertPriority, setAlertPriority] = useState("error");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [seasonNew, setSeasonNew] = useState(seasons[0].value);
  const [trainingList, setTrainingList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(
    Array.from({ length: 5 }, () => false)
  );
  const [uniqId, setUniqId] = useState(0);
  const [submitNewTraining, setSubmitNewTraining] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  const handleDialogOpen = (rowIndex) => {
    const updatedDialogOpen = [...dialogOpen];
    updatedDialogOpen[rowIndex] = true;
    setDialogOpen(updatedDialogOpen);
    console.log(dialogOpen);
  };
  console.log(selectedSeasons);
  const handleDialogClose = (rowIndex) => {
    const updatedDialogOpen = [...dialogOpen];
    for (let index = 0; index < 100; index++) {
      updatedDialogOpen[index] = false;
    }
    setDialogOpen(updatedDialogOpen);
  };
  const navigate = useNavigate();

  const SubmitTraings = async () => {
    await setSubmitNewTraining(true);
    await trainingList.forEach(async (train) => {
      delete train["title"];
      delete train["id"];
      const posted = await postTraining(train);
      if (posted === true) {
        setAlertMessage("Trainings added succesfuly");
        setAlertPriority("success");
        setAlertOpen(true);
        setTrainingList([]);
        setSubmitNewTraining(false);
        await navigate("/done");
      }
    })
  };

  const handleSeasonChange = (rowIndex, event) => {
    const updatedSelectedSeasons = [...selectedSeasons];
    updatedSelectedSeasons[rowIndex] = event.target.value;
    setSelectedSeasons(updatedSelectedSeasons);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const updatedSelectedSeasons = [...selectedSeasons];
    for (let index = 0; index < rows.length; index++) {
      updatedSelectedSeasons[index] = seasons[0].value;
    }
    setSelectedSeasons(updatedSelectedSeasons);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    const newListItems = trainingList.filter((item) => item.id !== id);
    setTrainingList(newListItems);
  };

  const iprops = {
    style: { fontFamily: "var(--font)" },
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  if (loading) {
    return (
      <div className="trainingTable" style={{display: "flex", justifyContent: 'space-between',}}>
        <Box sx={{ width: "62%" }}>
        <Skeleton sx={{ height: "8vh" }} />
        <Skeleton sx={{ height: "8vh" }} />
        <Skeleton sx={{ height: "8vh" }} animation="wave" />
        <Skeleton sx={{ height: "8vh" }} animation="wave" />
      </Box>

      <div className="list" style={{minWidth: '35%',}}>
      <div className="div2">
            <Divider />
            <div className="div">
              <h2>YOUR TRAININGS LIST</h2>
            </div>
            <Divider />
            <br />
              <div className="trainings" style={{ minHeight: 495 }}>
                {trainingList.length > 0 ? (
                  <>
                    <List>
                      {trainingList.map((item) => (
                        <>
                          <ListItem key={item.id}>
                            <ListItemText
                              sx={{
                                width: "75%",
                                fontFamily: "var(--font)",
                                marginRight: "30px",
                              }}
                              primary={item.title}
                              secondary={item.season}
                            />
                            <ListItemSecondaryAction>
                              <>
                                <IconButton
                                  edge="end"
                                  color="error"
                                  aria-label="delete"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  color="warning"
                                  aria-label="delete"
                                  onClick={() => handleDialogOpen(item.id)}
                                >
                                  <EditCalendarIcon />
                                </IconButton>
                              </>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Dialog
                            sx={{ fontFamily: "var(--font)" }}
                            open={dialogOpen[item.id]}
                            onClose={handleDialogClose}
                          >
                            <DialogTitle sx={{ fontFamily: "var(--font)" }}>
                              {item.title}
                            </DialogTitle>
                            <DialogContent>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  trainingList.filter(
                                    (_item) => _item.id === item.id
                                  )[0]["season"] = seasonNew;
                                  setTrainingList(trainingList);
                                  handleDialogClose(item.id);
                                }}
                              >
                                <TextField
                                  required
                                  select
                                  autoFocus
                                  margin="dense"
                                  label="Quarter"
                                  type="text"
                                  fullWidth
                                  value={seasonNew}
                                  onChange={(e) => {
                                    setSeasonNew(e.target.value);
                                  }}
                                >
                                  {seasons.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                                <Button
                                  sx={{
                                    fontFamily: "var(--font)",
                                    color: "var(--primary)",
                                  }}
                                  type="submit"
                                >
                                  Update Quarter
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </>
                      ))}
                    </List>
                    <Divider />
                    <br />
                    <div
                      className="saveBtn"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        onClick={() => {
                          setTrainingList([]);
                        }}
                        sx={{ padding: "10px", minWidth: "150px" }}
                        variant="contained"
                        color="error"
                        endIcon={<ClearIcon />}
                      >
                        CLEAR
                      </Button>
                      <div className="space"></div>
                      <LoadingButton
                        loading={submitNewTraining}
                        onClick={SubmitTraings}
                        sx={{ padding: "10px", minWidth: "150px" }}
                        variant="contained"
                        color="success"
                        endIcon={<SaveIcon />}
                      >
                        SUBMIT
                      </LoadingButton>
                    </div>
                    <br />
                    <Divider />
                  </>
                ) : (
                  <h4>No trainings added!</h4>
                )}
              </div>
          </div>
      </div>
      </div>
    );
  } else {
    return (
      <>
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
        <div
          className="trainingsData"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: 'wrap',
          }}
        >
          <div className="div1" style={{ minWidth: "60%" }}>
            <Divider />
            <div className="div">
              <h2>TRAININGS LIST</h2>
            </div>
            <Divider />
            <br />
            <Paper sx={{ overflow: "hidden" }}>
              <TableContainer
                sx={{ maxHeight: 445, minHeight: 445 }}
                loading={loading}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "var(--white)",
                            fontFamily: "var(--font)",
                            fontWeight: "bold",
                            minWidth: column.minWidth,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            sx={{ fontFamily: "var(--font)" }}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              if (column.id === "season") {
                                return (
                                  <TableCell
                                    sx={{
                                      fontFamily: "var(--font)",
                                      color: "red",
                                    }}
                                    align="left"
                                  >
                                    <div
                                      className="inputForSeason"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <TextField
                                        size="small"
                                        sx={{
                                          minWidth: "80%",
                                          padding: "-15px",
                                        }}
                                        InputProps={iprops}
                                        select
                                        value={selectedSeasons[index]}
                                        defaultValue={selectedSeasons[index]}
                                        onChange={(event) =>
                                          handleSeasonChange(index, event)
                                        }
                                      >
                                        {seasons.map((option) => (
                                          <MenuItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                      <Button
                                      
                                        sx={{
                                          padding: "10px",
                                          minWidth: "50px",
                                        }}
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                          setAlertOpen(false);
                                          var pass = true;
                                          localStorage.getItem('trainings') !== null ? localStorage.getItem('trainings') : localStorage.setItem('trainings', '0');
                                          localStorage.getItem('totalTrainings') !== null ? localStorage.getItem('totalTrainings') : localStorage.setItem('totalTrainings', '0');
                                          if (trainingList.length + parseInt(localStorage.getItem('trainings')) + parseInt(localStorage.getItem('totalTrainings')) < 3) {
                                            trainingList.forEach((training) => {
                                              if (
                                                training["title"] ===
                                                row["title"]
                                              ) {
                                                pass = false;
                                                setAlertPriority("error");
                                                setAlertMessage(
                                                  "You have already picked this training"
                                                );
                                                setAlertOpen(true);
                                              }
                                            });
                                            if (pass) {
                                              console.log(row);
                                              trainingList.push({
                                                id: row["id"],
                                                training_id: row["id"],
                                                title: row["title"],
                                                season: selectedSeasons[index],
                                                employee_id:
                                                  decodedToken["employee_id"],
                                              });
                                              console.log(trainingList);
                                              setTrainingList(trainingList);
                                              setUniqId(uniqId + 1);
                                            }
                                          } else {
                                            setAlertPriority("error");
                                            setAlertMessage(
                                              localStorage.getItem('totalTrainings') === 0 ? "You can only chose 3 trainings" : "You have already picked " + localStorage.getItem('totalTrainings') + " in you previous session, and you can only choose 3 trainings"
                                              
                                            );
                                            setAlertOpen(true);
                                          }
                                        }}
                                      >
                                        <AddIcon />
                                      </Button>
                                    </div>
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    sx={{ fontFamily: "var(--font)", maxWidth:'300px' }}
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage="Rows"
                rowsPerPageOptions={[5, 15, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <div className="div2" style={{ minWidth: "35%", maxWidth: "35%" }}>
            <Divider />
            <div className="div">
              <h2>YOUR TRAININGS LIST</h2>
            </div>
            <Divider />
            <br />
              <div className="trainings" style={{ minHeight: 495 }}>
                {trainingList.length > 0 ? (
                  <>
                    <List>
                      {trainingList.map((item) => (
                        <>
                          <ListItem key={item.id}>
                            <ListItemText
                              sx={{
                                width: "75%",
                                fontFamily: "var(--font)",
                                marginRight: "30px",
                              }}
                              primary={item.title}
                              secondary={item.season}
                            />
                            <ListItemSecondaryAction>
                              <>
                                <IconButton
                                  edge="end"
                                  color="error"
                                  aria-label="delete"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  color="warning"
                                  aria-label="delete"
                                  onClick={() => handleDialogOpen(item.id)}
                                >
                                  <EditCalendarIcon />
                                </IconButton>
                              </>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Dialog
                            sx={{ fontFamily: "var(--font)" }}
                            open={dialogOpen[item.id]}
                            onClose={handleDialogClose}
                          >
                            <DialogTitle sx={{ fontFamily: "var(--font)" }}>
                              {item.title}
                            </DialogTitle>
                            <DialogContent>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  trainingList.filter(
                                    (_item) => _item.id === item.id
                                  )[0]["season"] = seasonNew;
                                  setTrainingList(trainingList);
                                  handleDialogClose(item.id);
                                }}
                              >
                                <TextField
                                  required
                                  select
                                  autoFocus
                                  margin="dense"
                                  label="Quarter"
                                  type="text"
                                  fullWidth
                                  value={seasonNew}
                                  onChange={(e) => {
                                    setSeasonNew(e.target.value);
                                  }}
                                >
                                  {seasons.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                                <Button
                                  sx={{
                                    fontFamily: "var(--font)",
                                    color: "var(--primary)",
                                  }}
                                  type="submit"
                                >
                                  Update Quarter
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </>
                      ))}
                    </List>
                    <Divider />
                    <br />
                    <div
                      className="saveBtn"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        onClick={() => {
                          setTrainingList([]);
                        }}
                        sx={{ padding: "10px", minWidth: "150px" }}
                        variant="contained"
                        color="error"
                        endIcon={<ClearIcon />}
                      >
                        CLEAR
                      </Button>
                      <div className="space"></div>
                      <LoadingButton
                        loading={submitNewTraining}
                        onClick={SubmitTraings}
                        sx={{ padding: "10px", minWidth: "150px" }}
                        variant="contained"
                        color="success"
                        endIcon={<SaveIcon />}
                      >
                        SUBMIT
                      </LoadingButton>
                    </div>
                    <br />
                    <Divider />
                  </>
                ) : (
                  <h4>No trainings added!</h4>
                )}
              </div>
          </div>
        </div>
      </>
    );
  }
}
