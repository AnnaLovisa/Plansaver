import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import modalReducer from "./modalReducer";
import viewReducer from "./viewReducer";
import viewProjectReducer from "./viewProjectReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modal: modalReducer,
  viewItem: viewReducer,
  viewProjectItem: viewProjectReducer
});