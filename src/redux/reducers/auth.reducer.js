import * as types from "../constants/auth.constants";

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case types.LOGIN_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default authReducer;
