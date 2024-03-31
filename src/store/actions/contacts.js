import { db } from "@firebaseConf";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
export const SET_CONTACTS = "SET_CONTACTS";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_CALLS = "SET_CALLS";

export const fetchContacts = () => {
  return async (dispatch, getState) => {
      const state = getState();
      const email = state.auth.email;
      const q = query(collection(db, "contacts"), where("user", "==", email));
      
      try {
          const querySnapshot = await getDocs(q);
          const loadContacts = querySnapshot.docs.map(doc => doc.data());
          
          dispatch({
              type: SET_CONTACTS,
              contacts: loadContacts,
          });
      } catch (error) {
          console.error("Error fetching contacts:", error);
      }
  };
};

  export const fetchMessages = (email) => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(collection(db, "messages"));

        const loadMessages = [];
        querySnapshot.forEach((doc) => {
        loadMessages.push(doc.data());
        });
      dispatch({
        type: SET_MESSAGES,
        messages: loadMessages,
      })
    };
  };

  export const fetchMessagesPerContact = (contactEmail) => {
    return async (dispatch, getState) => {
        const state = getState();
        const email = state.auth.email;
        const q1 = query(
          collection(db, "messages"), 
          where("sender", "==", email), 
          where("receiver", "==", contactEmail)
      );

      const q2 = query(
          collection(db, "messages"), 
          where("sender", "==", contactEmail), 
          where("receiver", "==", email)
      );
        
        try {
          const unsubscribe = onSnapshot(q1, (snapshot1) => {
            const unsubscribe2 = onSnapshot(q2, (snapshot2) => {
              const loadMessages = snapshot1.docs.concat(snapshot2.docs).map(doc => doc.data());
              dispatch({
                  type: SET_MESSAGES,
                  messages: loadMessages.sort((a, b) => a.timestamp - b.timestamp),
              });
            });
          });
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };
  };

  export const fetchCalls = () => {
    return async (dispatch,getState) => {
      const state = getState();
      const email = state.auth.email;
        const querySnapshot = await getDocs(query(collection(db, "phoneCalls"),where("email","==",email)));

        const loadCalls = [];
        querySnapshot.forEach((doc) => {
          loadCalls.push(doc.data());
        });
      dispatch({
        type: SET_CALLS,
        calls: loadCalls.sort((a, b) => b.timestamp - a.timestamp)
      })
    };
  };

export const sendMessage = (message) => {
  return async () => {
    try {
      await addDoc(collection(db, "messages"), message);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
}

export const addPhoneCall = (phone) => {
  return async (dispatch,getState) => {
    const state = getState();
    const email = state.auth.email;
    const action = addDoc(collection(db, "phoneCalls"), {email:email,phone:phone,timestamp:Date.now()})
    try {
      await action;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}