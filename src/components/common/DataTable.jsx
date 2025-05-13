import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Typography,
  Pagination,
  Stack,
  Paper,
} from "@mui/material";

export default function DataTable({
  title,
  columns,
  data,
  showSearch,
  showAddButton,
  showAddNewButton,
  pagination,
  onAdd,
  onAddNew,
}) {
  const [searchText, setSearchText] = useState("");
  const [showEntries, setShowEntries] = useState(5);
  const [page, setPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleShowEntriesChange = (event) => {
    setShowEntries(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (page - 1) * showEntries,
    page * showEntries
  );

  return (
    <Box p={2} component={Paper} borderRadius={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <label>Show</label>
          <Select
            sx={{ height: "40px" }}
            value={showEntries}
            onChange={handleShowEntriesChange}
          >
            {[5, 10, 20, 30, 50].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
          {showSearch && (
            <TextField
              size="small"
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
            />
          )}
        </Box>
        <Box display="flex" gap={2}>
          {showAddButton && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "var(--primary-clr)",
                borderRadius: "var(--border-radius)",
              }}
              onClick={onAdd}
            >
              + Add
            </Button>
          )}
          {showAddNewButton && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "var(--primary-clr)", // Changed from #16a34a to var(--primary-clr)
                borderRadius: "var(--border-radius)",
              }}
              onClick={onAddNew}
            >
              + Add New
            </Button>
          )}
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "var(--table-header-text)" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {col.render ? col.render(row, rowIndex) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <Pagination
            count={Math.ceil(filteredData.length / showEntries)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              ".MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "var(--primary-clr)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "var(--primary-clr)",
                  opacity: 0.9,
                },
              },
            }}
          />
        </Stack>
      )}
      <Typography variant="body2" color="text.secondary" mt={1}>
        Showing {filteredData.length === 0 ? 0 : (page - 1) * showEntries + 1}{" "}
        to
        {Math.min(page * showEntries, filteredData.length)} of{" "}
        {filteredData.length} entries
      </Typography>
    </Box>
  );
}
