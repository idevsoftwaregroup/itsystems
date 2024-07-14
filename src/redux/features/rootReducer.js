import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./alert/alertSlice";
const rootReducer = combineReducers({
  alert: alertReducer,
});
export default rootReducer;
