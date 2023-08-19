import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./slice";

export const registerDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateUserProfile =
  ({ name, image }) =>
  async (dispatch, getState) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile({
          displayName: name,
          photoURL: image,
        });

        const { displayName, uid, email, photoURL } = await auth.currentUser;

        const userUpdateProfile = {
          userId: uid,
          name: displayName,
          email: email,
          image: photoURL,
        };

        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      } catch (error) {
        console.log(error.message);
      }
    }
  };
