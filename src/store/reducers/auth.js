import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        email: action.email,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
