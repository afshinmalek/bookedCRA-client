import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./form";
import dateReducer from "./date";
import timeReducer from "./time";
import maiReducer from "./mongoAvailabilityId";

const rootReducer = combineReducers({
  form: formReducer,
  date: dateReducer,
  time: timeReducer,
  mongoAvailabilityId: maiReducer,
});

export default rootReducer;
