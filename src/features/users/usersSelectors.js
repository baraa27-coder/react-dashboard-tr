export const selectUsers = (state) => state.users.users;

export const selectUsersLoading = (state) => state.users.loading;

export const selectUsersError = (state) => state.users.error;

export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectUsersState = (state) => state.users;

export const selectSelectedUserLoading = (state) =>
  state.users.selectedUserLoading;

export const selectSelectedUserError = (state) =>
  state.users.selectedUserError;