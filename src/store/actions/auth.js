export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signup = (values) => {
  return async () => {
    //Adding a user to the database
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

//Declaring the login action
export const login = (values) => {
  return async (dispatch) => {
    //Signing in the user
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password).then(
        (userCredential) => {
          const user = userCredential.user;
          dispatch({ type: AUTHENTICATE, email: user.email });
        }).catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

//Declaring the logout action
export const logout = () => {
  //Removing userdata from the storage
  auth.signOut();
  return { type: LOGOUT };
};