import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  Box,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUserDialog from "./DeleteUserDialog";

import useUsers from "../hooks/useUsers";

function UsersTable() {
  const { users, loading, error, fetchAllUsers } = useUsers();


  const navigate = useNavigate();


  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
  fetchAllUsers();
}, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

 const handleReload = () => {
  fetchAllUsers();
};

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleOpenDeleteDialog = (user, event) => {
    event.stopPropagation();
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Users List
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            size="small"
            label="Search user"
            value={search}
            onChange={handleSearchChange}
          />

          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleReload}
            disabled={loading}
          >
            Reload
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="error" mb={2}>
            Failed to load users: {error}
          </Typography>

          <Button variant="contained" onClick={handleReload}>
            Try Again
          </Button>
        </Box>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6" mb={1}>
            No users found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing the search text.
          </Typography>
        </Box>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => navigate(`/users/${user.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={(event) => handleOpenDeleteDialog(user, event)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <DeleteUserDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        user={selectedUser}
      />
    </Paper>
  );
}

export default UsersTable;