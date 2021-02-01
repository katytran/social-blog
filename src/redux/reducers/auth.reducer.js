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
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state,

        loading: false,
        isAuthenticated: false,
      };
    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
      return { ...state, error: payload, loading: false };
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
