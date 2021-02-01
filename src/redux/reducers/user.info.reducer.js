import * as types from "../constants/users.constants";
// <<<<<<< katybranch

// // https://fontawesome.com/icons/photo-video?style=solid   --find initial image file or upload photo button icon here
// // <i class="fas fa-photo-video"></i>                      --same icon image html from here

// const initialState = {
//   avatarUrl: "",
//   name: null,
//   email: null,
//   registered: false,
// =======

const initialState = {
  user: {},
  registered: false,
  loading: false,

};

const userInfo = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        registered: true,
      };

    default:
      return state;
  }
};


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
