import {
    SET_CONTACTS,
    SET_MESSAGES,
    SET_LAST_MESSAGE_PER_CONTACT
} from '../actions/contacts'
  const initialState = {
    contacts: [],
    messages: []
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_CONTACTS:
        return {
          contacts: action.contacts,
        };
        case SET_MESSAGES:
        return {
          messages: action.messages,
        };
    }
    return state;
  };