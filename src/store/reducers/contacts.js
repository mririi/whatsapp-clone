import {
  SET_CONTACTS,
  SET_MESSAGES,
  SET_CALLS
} from '../actions/contacts';

const initialState = {
  contacts: [],
  messages: [],
  calls: []
};

export default (state = initialState, action) => {
  switch (action.type) {
      case SET_CONTACTS:
          return {
              ...state,
              contacts: action.contacts,
          };
      case SET_MESSAGES:
          return {
              ...state,
              messages: action.messages,
          };
      case SET_CALLS:
          return {
              ...state,
              calls: action.calls,
          };
      default:
          return state;
  }
};
