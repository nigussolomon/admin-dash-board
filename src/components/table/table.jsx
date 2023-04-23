import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        trainingTitle: "11091700",
      },
      {
        date: "2020-01-02",
        trainingTitle: "Anonymous",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{fontFamily: 'var(--font)'}} component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell sx={{fontFamily: 'var(--font)'}} >{row.calories}</TableCell>
        <TableCell sx={{fontFamily: 'var(--font)'}} >{row.fat}</TableCell>
        <TableCell sx={{fontFamily: 'var(--font)'}} >{row.carbs}</TableCell>
        <TableCell sx={{fontFamily: 'var(--font)'}} >{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontFamily: 'var(--font)'}} variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontFamily: 'var(--font)'}}>Date</TableCell>
                    <TableCell sx={{fontFamily: 'var(--font)'}} align="right">Training Title</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow sx={{fontFamily: 'var(--font)'}} key={historyRow.date}>
                      <TableCell sx={{fontFamily: 'var(--font)'}} component="th" scope="row">
                        {historyRow.date}
                      </TableCell>

                      <TableCell sx={{fontFamily: 'var(--font)'}} align="right">
                        {historyRow.trainingTitle}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "Nigus Solomon",
    "nigus.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
  createData(
    "Hemen Solomon",
    "hemen.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
  createData(
    "Eyosias Mekbib",
    "nigus.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
  createData(
    "Hemen Solomon",
    "hemen.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
  createData(
    "Nigus Solomon",
    "nigus.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
  createData(
    "Hemen Solomon",
    "hemen.solomon@mks.com",
    "Software Engineering",
    "Addis Ababa",
    "Bole"
  ),
];

export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "var(--primary-color)" }}>
            <TableCell />
            <TableCell sx={{ color: "var(--white)", fontFamily: 'var(--font)', fontWeight: 'bold',}}>TRAINEE NAME</TableCell>
            <TableCell sx={{ color: "var(--white)", fontFamily: 'var(--font)', fontWeight: 'bold',}}>
              EMAIL
            </TableCell>
            <TableCell sx={{ color: "var(--white)", fontFamily: 'var(--font)', fontWeight: 'bold',}}>
              DEPARTMENT
            </TableCell>
            <TableCell sx={{ color: "var(--white)", fontFamily: 'var(--font)', fontWeight: 'bold',}}>
              REGION
            </TableCell>
            <TableCell sx={{ color: "var(--white)", fontFamily: 'var(--font)', fontWeight: 'bold',}}>
              BRANCH
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
