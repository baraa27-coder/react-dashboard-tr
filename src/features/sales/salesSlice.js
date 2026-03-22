import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 600 },
    { month: "Mar", revenue: 300 },
    { month: "Apr", revenue: 800 },
    { month: "May", revenue: 700 },
  ],
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
});

export default salesSlice.reducer;