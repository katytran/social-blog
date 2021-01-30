import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import blogReducer from "./blog.reducer";

export default combineReducers({
  auth: authReducer,
  blog: blogReducer,
});
