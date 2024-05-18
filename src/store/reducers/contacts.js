import {
    SET_CONTACTS,
    SET_MESSAGES,
    SET_CALLS,
    SET_CURRENT_PROFILE,
    SET_CONTACTS_USER,
    RESET
} from '../actions/contacts';

const initialState = {
    contacts: [],
    contactsUser: [],
    messages: [],
    calls: [],
    currentProfile: {},
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
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.profile,
            };
        case SET_CONTACTS_USER:
            return {
                ...state,
                contactsUser: action.contactsUser,
            };
        case RESET:
            return initialState;
        default:
            return state;
    }
};
