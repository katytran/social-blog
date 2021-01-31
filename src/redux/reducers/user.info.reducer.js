import * as types from "../constants/users.constants";

const initialState = {
  user: {},
  registered: false,
  loading: false,
};

const userInfo = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.data,
        registered: true
      };
    default:
      return state;
  }
};

export default userInfo;
