import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  editUser,
} from "./services/usersApi";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getUsers();
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    return await getUserById(id);
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser) => {
    return await createUser(newUser);
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    return await removeUser(id);
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }) => {
    const updatedUser = await editUser(id, updatedData);
    return { id, updatedUser };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,

    selectedUser: null,
    selectedUserLoading: false,
    selectedUserError: null,

    addLoading: false,
    addError: null,

    deleteLoading: false,
    deleteError: null,

    updateLoading: false,
    updateError: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.selectedUserError = null;
      state.selectedUserLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUserById.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.error.message;
      })

      .addCase(addUser.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addLoading = false;
        state.users = [{ ...action.payload, id: Date.now() }, ...state.users];
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error.message;
      })

      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;

        const { id, updatedUser } = action.payload;

        state.users = state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );

        if (state.selectedUser?.id === id) {
          state.selectedUser = { ...state.selectedUser, ...updatedUser };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error.message;
      });
  },
});

export const { clearUsers, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;