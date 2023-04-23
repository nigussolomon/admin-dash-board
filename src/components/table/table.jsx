import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'department', label: 'Department', minWidth: 170, },
  { id: 'region', label: 'Region', minWidth: 170, },
  { id: 'trainingTitle', label: 'Training Title', minWidth: 170, },
  { id: 'date', label: 'Date', minWidth: 170, },
];

export default function StickyHeadTable({rows, loading}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return(
      <Box sx={{ width: '100%' }}>
      <Skeleton sx={{ height: '5vh' }}/>
      <Skeleton sx={{ height: '5vh' }}/>
      <Skeleton sx={{ height: '5vh' }} animation="wave" />
      <Skeleton sx={{ height: '5vh' }} animation="wave" />
    </Box>
    );
  } else {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} loading={loading}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{backgroundColor: 'var(--primary-color)', color: 'var(--white)', fontFamily: 'var(--font)', fontWeight: 'bold', minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow sx={{fontFamily: 'var(--font)',}} hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell sx={{fontFamily: 'var(--font)',}} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
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
    );
  }
}