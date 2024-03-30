import { AUTHENTICATE, LOGOUT } from "../actions/auth";

//Initialising state
const initialState = {
  email: null,
};

//Handling actions
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
