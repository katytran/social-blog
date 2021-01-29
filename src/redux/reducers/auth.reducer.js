import * as types from "../constants/auth.constants";

const initialState = {
  user: {
    userName: null,
    email: null,
    password: null,
  },
  accessToken: "",
  isLoading: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      state;
  }
};

export default authReducer;
