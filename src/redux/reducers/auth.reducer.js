import * as types from "../constants/auth.constants";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //login
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false };
    case types.LOGIN_FAILURE:
      return { ...state, error: payload, loading: false };
    //get current user
    case types.GET_USER_REQUEST:
      return {...state,loading: true};
    case types.GET_USER_SUCCESS:
      return {...state, isAuthenticated: true, loading: false, user: payload};
    case types.GET_USER_FAILURE:
      return {...state, loading: false};
    //update profile
    case types.UPDATE_PROFILE_REQUEST:
      return {...state,loading: true};
    case types.UPDATE_PROFILE_SUCCESS:
      return {...state, user : {...state.user, payload}, loading: false};
    case types.UPDATE_PROFILE_FAILURE:
      return {...state, loading: false}
    //logout
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
