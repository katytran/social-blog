import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    if (response.data.success === true) {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response.data.data.accessToken,
      });
    }
  } catch (error) {
    toast.configure();
    toast.error("😥 Please check your email or password!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.removeItem("token");
  dispatch({ type: types.LOGOUT, payload: null });
};

const register = (name, email, password, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password, avatarUrl });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.configure();
    await toast.success(`Thank you for your registration, ${name}!`);
    //go back to home temorarily
    window.location.replace("http://localhost:3000/login");
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.put(`/blogs/${blogId}`, { title, content, images });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    toast.configure();
    await toast.success(`You have just updated your blog`);
    window.location.replace("http://localhost:3000/login");
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const authActions = {
  login,
  logout,
  register,
  getCurrentUser,
  updateBlog,
};

export default authActions;
