import { LOGOUT } from "../actions/auth";

//Initialising state
const initialState = {};

//Handling actions
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
