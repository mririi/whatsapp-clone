import { db } from "@firebaseConf";
import { ref, set, get, child, push, query, orderByChild, equalTo, onValue } from "firebase/database";

export const SET_CONTACTS = "SET_CONTACTS";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_CALLS = "SET_CALLS";
export const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE";
export const SET_CONTACTS_USER = "SET_CONTACTS_USER";
export const RESET = "RESET";

export const fetchContacts = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    const contactsRef = ref(db, 'contacts');

    try {
      onValue(contactsRef, (snapshot) => {
        const loadContacts = [];
        snapshot.forEach((childSnapshot) => {
          loadContacts.push(childSnapshot.val());
        });
        dispatch({
          type: SET_CONTACTS,
          contacts: loadContacts.filter(contact => contact.user !== email),
        });
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
};

export const fetchContactsCurrentUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    if (!email) {
      return;
    }
    const currentRef = query(ref(db, 'contacts'), orderByChild('user'), equalTo(email));
    try {
      const snapshotCurrent = await get(currentRef);

      onValue(ref(db, 'contacts'), (snapshot) => {
        const loadContacts = [];
        contactsEmails = Object.values(snapshotCurrent.val())[0].contacts || [];
        snapshot.forEach((childSnapshot) => {

          loadContacts.push(childSnapshot.val());
        });
        dispatch({
          type: SET_CONTACTS_USER,
          contactsUser: loadContacts.filter(contact => contactsEmails.includes(contact.user)),
        });
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
};

export const addToContacts = (pseudo) => {
  return async (_, getState) => {
    const state = getState();
    const email = state.auth.email;
    if (!email) {
      return;
    }
    const currentRef = query(ref(db, 'contacts'), orderByChild('user'), equalTo(email));
    const contactRef = query(ref(db, 'contacts'), orderByChild('pseudo'), equalTo(pseudo));

    try {
      const snapshotCurrent = await get(currentRef);
      const snapshotContact = await get(contactRef);

      if (snapshotCurrent.exists() && snapshotContact.exists()) {
        const contactCurrent = snapshotCurrent.val();
        const existingContactKey = Object.keys(contactCurrent)[0];
        const existingContactRef = ref(db, `contacts/${existingContactKey}`);
        const currentContactData = contactCurrent[existingContactKey];

        const contacts = currentContactData.contacts || [];
        const newContactEmail = Object.values(snapshotContact.val())[0].user;

        if (!contacts.includes(newContactEmail)) {
          contacts.push(newContactEmail);
        }

        await set(existingContactRef, {
          ...currentContactData,
          contacts: contacts
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    if (!email) {
      return;
    }
    const contactsRef = ref(db, 'contacts');

    try {
      const snapshot = await get(contactsRef);

      if (snapshot.exists()) {
        const contacts = snapshot.val();
        const profile = Object.values(contacts).find(contact => contact.user === email);

        if (profile) {
          dispatch({
            type: SET_CURRENT_PROFILE,
            profile: profile,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
};

export const saveProfile = (profile, edit) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    const contactsRef = ref(db, 'contacts');
    const newContactRef = push(contactsRef);
    const pseudoQuery = query(contactsRef, orderByChild('pseudo'), equalTo(profile.pseudo));
    const contact = { user: email, pseudo: profile.pseudo, fullName: profile.fullName, phone: profile.phone };

    try {
      const snapshot = await get(pseudoQuery);
      if (snapshot.exists()) {
        if (!edit) {
          console.error("Pseudo already exists. Please choose a different one.");
          return;
        } else {
          const existingContactKey = Object.keys(snapshot.val())[0];
          const existingContactRef = ref(db, `contacts/${existingContactKey}`);
          await set(existingContactRef, contact)
        }
      } else {
        await set(newContactRef, contact);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };
};

export const fetchMessagesPerContact = (contactEmail) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    if (!email) {
      return;
    }
    try {
      const emails = [email, contactEmail].map(email => email.replace(/\./g, '')).sort(); // Ensure consistent order
      const discussionId = `${emails[0]}_${emails[1]}`;
      const discussionRef = ref(db, `discussions/${discussionId}`);

      const unsubscribe = onValue(discussionRef, (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.val().messages || {};
          const loadedMessages = Object.keys(messagesData).map((key) => ({
            ...messagesData[key],
            id: key,
          }));
          dispatch({
            type: SET_MESSAGES,
            messages: loadedMessages,
          });
        } else {
          dispatch({
            type: SET_MESSAGES,
            messages: [],
          });
        }
      });

      // Cleanup function to remove the listener
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
};

export const fetchCalls = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.auth.email;
    if (!email) {
      return;
    }
    const callsRef = query(ref(db, 'phoneCalls'), orderByChild('user'), equalTo(email));

    try {
      onValue(callsRef, (snapshot) => {
        const loadCalls = [];
        snapshot.forEach((childSnapshot) => {
          loadCalls.push(childSnapshot.val());
        });
        dispatch({
          type: SET_CALLS,
          calls: loadCalls.sort((a, b) => b.timestamp - a.timestamp),
        });
      });
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
  };
};

export const sendMessage = (message) => {
  return async () => {
    try {
      const emails = [message.sender, message.receiver].map(email => email.replace(/\./g, '')).sort(); // Ensure consistent order
      const discussionId = `${emails[0]}_${emails[1]}`;
      const discussionRef = ref(db, `discussions/${discussionId}`);

      const snapshot = await get(discussionRef);

      if (snapshot.exists()) {
        const messages = snapshot.val().messages || [];
        messages.push(message);
        await set(discussionRef, { messages });
      } else {
        await set(discussionRef, { messages: [message] });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};

export const addPhoneCall = (phone) => {
  return async (_, getState) => {
    const state = getState();
    const user = state.auth.email;
    const phoneCallsRef = ref(db, 'phoneCalls');
    const newCallRef = push(phoneCallsRef);
    const phoneCall = { user, phone, timestamp: Date.now() };

    try {
      await set(newCallRef, phoneCall);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};

export const resetProfile = () => {
  return async (dispatch, _) => {
    dispatch({
      type: RESET,
    });
  };
}