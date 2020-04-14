import { combineReducers } from "redux";
import kycFormReducer from "./kycFormReducer";

export default combineReducers({
  kyc: kycFormReducer,
});
