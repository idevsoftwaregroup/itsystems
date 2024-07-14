import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  state: "",
  title: "",
  message: "",
};
export const alertSlice = createSlice({
  name: "alertSlice",
  initialState: INITIAL_STATE,
  reducers: {
    showSuccessAlert: (state, action) => {
      state.state = "success";
      state.title = action.payload.title ? action.payload.title : "";
      state.message = action.payload.message ? action.payload.message : "";
      return state;
    },
    showErrorAlert: (state, action) => {
      state.state = "error";
      state.title = action.payload.title ? action.payload.title : "";
      state.message = action.payload.message ? action.payload.message : "";
      return state;
    },
    showWarningAlert: (state, action) => {
      state.state = "warning";
      state.title = action.payload.title ? action.payload.title : "";
      state.message = action.payload.message ? action.payload.message : "";
      return state;
    },
    hideAlert: (state) => {
      state.state = "";
      state.title = "";
      state.message = "";
      return state;
    },
  },
});
export const { showSuccessAlert, showErrorAlert, showWarningAlert, hideAlert } =
  alertSlice.actions;
export default alertSlice.reducer;
