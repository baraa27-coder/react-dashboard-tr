import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../usersSlice";
import { showAlert } from "../../alert/alertSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeleteUserDialog({ open, onClose, user }) {
  const dispatch = useDispatch();
  const { deleteLoading, deleteError } = useSelector((state) => state.users);

const handleDelete = async () => {
  if (!user) return;

  const resultAction = await dispatch(deleteUser(user.id));

  if (deleteUser.fulfilled.match(resultAction)) {
    dispatch(
      showAlert({
        message: "User deleted successfully",
        severity: "success",
      })
    );
    onClose();
  } else {
    dispatch(
      showAlert({
        message: "Failed to delete user",
        severity: "error",
      })
    );
  }
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete{" "}
          <strong>{user?.name}</strong>?
        </Typography>

        {deleteError && (
          <Typography color="error" variant="body2">
            Failed to delete user: {deleteError}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={deleteLoading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;