import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLayout from "../../../components/layout/MainLayout";
import {
  fetchUserById,
  clearSelectedUser,
} from "../usersSlice";
import {selectSelectedUser , selectSelectedUserError , selectSelectedUserLoading} from "../usersSelectors.js"

function UserDetails({ mode, toggleMode }) {
  const { id } = useParams();
  const dispatch = useDispatch();

const selectedUser = useSelector(selectSelectedUser);
const selectedUserLoading = useSelector(selectSelectedUserLoading);
const selectedUserError = useSelector(selectSelectedUserError);

  useEffect(() => {
    dispatch(fetchUserById(id));

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  return (
    <MainLayout mode={mode} toggleMode={toggleMode}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            User Details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Detailed information about the selected user.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/users"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back to Users
        </Button>
      </Box>

      {selectedUserLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {selectedUserError && !selectedUserLoading && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography color="error">
            Failed to load user details: {selectedUserError}
          </Typography>
        </Paper>
      )}

      {!selectedUserLoading && !selectedUserError && selectedUser && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {selectedUser.name}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography>
              <strong>Username:</strong> {selectedUser.username}
            </Typography>

            <Typography>
              <strong>Email:</strong> {selectedUser.email}
            </Typography>

            <Typography>
              <strong>Phone:</strong> {selectedUser.phone}
            </Typography>

            <Typography>
              <strong>Website:</strong> {selectedUser.website}
            </Typography>

            <Typography>
              <strong>Company:</strong> {selectedUser.company?.name}
            </Typography>

            <Typography>
              <strong>City:</strong> {selectedUser.address?.city}
            </Typography>

            <Typography>
              <strong>Street:</strong> {selectedUser.address?.street}
            </Typography>
          </Box>
        </Paper>
      )}
    </MainLayout>
  );
}

export default UserDetails;
/////ىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىىى