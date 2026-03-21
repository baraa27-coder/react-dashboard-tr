import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../../../components/layout/MainLayout";
import UsersTable from "../components/UsersTable";
import AddUserDialog from "../components/AddUserDialog";

function Users({ mode, toggleMode }) {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <MainLayout mode={mode} toggleMode={toggleMode}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Manage and monitor users data from the API.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add User
        </Button>
      </Box>

      <UsersTable />

      <AddUserDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
      />
    </MainLayout>
  );
}

export default Users;