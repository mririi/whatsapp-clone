import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import contactsReducer from './reducers/contacts';

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      contacts: contactsReducer
    },
  });

  return store;
}
