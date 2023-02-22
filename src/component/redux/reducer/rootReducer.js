import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "../slice/formSlice";
import dateReducer from "../slice/dateSlice";
import timeReducer from "../slice/timeSlice";
//import maiReducer from "../slice/maiSlice";

const rootReducer = combineReducers({
  form: formReducer,
  date: dateReducer,
  time: timeReducer,
  //mai: maiReducer,
});

export default rootReducer;
