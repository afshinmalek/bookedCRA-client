import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "../slice/formSlice";
import dateReducer from "../slice/dateSlice";
import timeReducer from "../slice/timeSlice";

const rootReducer = combineReducers({
  form: formReducer,
  date: dateReducer,
  time: timeReducer,
});

export default rootReducer;
