import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userInfo from "./user.info.reducer";
import blogReducer from "./blog.reducer";
// import friendsStuff from "./friends.reducer";

export default combineReducers({
  auth: authReducer,
  user: userInfo,
  blog: blogReducer,
  // friends: friendsStuff
});
