import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import alertReducer from "../features/alert/alertSlice";
import salesReducer from "../features/sales/salesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    alert: alertReducer,
    sales: salesReducer,
  },
});