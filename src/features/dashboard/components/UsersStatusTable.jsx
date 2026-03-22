import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectFilteredSortedUsersRows } from "../selectors/dashboardSelectors";

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "warning";
    case "banned":
      return "error";
    default:
      return "default";
  }
};

function UsersStatusTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filters = useMemo(
    () => ({
      status: statusFilter,
      sortBy,
      sortOrder,
    }),
    [statusFilter, sortBy, sortOrder]
  );

  const filteredRows = useSelector((state) =>
    selectFilteredSortedUsersRows(state, filters)
  );

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, page, rowsPerPage]);

  const handleFilterChange = (_, newValue) => {
    setStatusFilter(newValue);
    setPage(0);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setPage(0);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 4, borderRadius: 3, overflow: "hidden" }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Users Status Table
        </Typography>

        <Tabs
          value={statusFilter}
          onChange={handleFilterChange}
          sx={{ mb: 2 }}
        >
          <Tab label="All" value="all" />
          <Tab label="Active" value="active" />
          <Tab label="Inactive" value="inactive" />
          <Tab label="Banned" value="banned" />
        </Tabs>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleSortByChange}>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              label="Order"
              onChange={handleSortOrderChange}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Company</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  color={getStatusColor(row.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/users/${row.id}`}
                  variant="outlined"
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </TableContainer>
  );
}

export default UsersStatusTable;