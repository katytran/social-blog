import * as types from "../constants/auth.constants";
import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userInfo from "./user.info.reducer";
// import blogReducer from "./blog.reducer";


const rootReducer = combineReducers({
  auth: authReducer,
  user: userInfo,
  // blog: blogReducer,
});




export default rootReducer