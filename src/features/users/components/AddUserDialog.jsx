import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../usersSlice";
import { showAlert } from "../../alert/alertSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

function AddUserDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { addLoading, addError } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

const handleSubmit = async () => {
  const isValid = validateForm();

  if (!isValid) return;

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: {
      name: formData.company,
    },
  };

  const resultAction = await dispatch(addUser(payload));

  if (addUser.fulfilled.match(resultAction)) {
    dispatch(
      showAlert({
        message: "User added successfully",
        severity: "success",
      })
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
    setFormErrors({});
    onClose();
  } else {
    dispatch(
      showAlert({
        message: "Failed to add user",
        severity: "error",
      })
    );
  }
};

  const handleClose = () => {
    setFormErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            fullWidth
          />

          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={!!formErrors.company}
            helperText={formErrors.company}
            fullWidth
          />

          {addError && (
            <Typography color="error" variant="body2">
              Failed to add user: {addError}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={addLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={addLoading}
        >
          {addLoading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;