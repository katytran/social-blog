import { combineReducer } from "react-redux";
import authReducer from "./auth.reducer";
import blogReducer from "./blog.reducer";

export default combineReducer({
  auth: authReducer,
  blog: blogReducer,
});
