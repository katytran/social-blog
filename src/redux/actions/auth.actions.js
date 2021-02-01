import * as types from "../constants/auth.constants";
import api from "../../apiService";

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
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.removeItem("token");
  dispatch({ type: types.LOGOUT, payload: null });
};

const getCurrentUser = ()=>async (dispatch) =>{
  dispatch({type: types.GET_USER_REQUEST});
  try {
    const url = "/users/me";
    const res = await api.get(url);
    console.log("success user", res.data.data)
    if (res.data.success === true) {
      console.log(res.data.data.name)
      dispatch({type: types.GET_USER_SUCCESS, payload: res.data.data})
    }
  } catch (error) {
    dispatch({type: types.GET_USER_FAILURE, payload: error.message})
  }
}

const updateProfile =(name, avatarUrl)=> async (dispatch) =>{
  dispatch({type: types.UPDATE_PROFILE_REQUEST});
  try {
    const url = "/users";
    const res = await api.put(url,{name, avatarUrl})
    if (res.data.success===true){
      dispatch({type: types.GET_USER_SUCCESS, payload: res.data.data})
    }

  }catch (error){
    dispatch({type: types.UPDATE_PROFILE_FAILURE, payload: error.message})

  }
}

const authActions = {
  login,
  logout,
  getCurrentUser,
  updateProfile,
};

export default authActions;
