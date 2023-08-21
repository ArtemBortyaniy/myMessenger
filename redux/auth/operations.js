import Toast from "react-native-toast-message";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./slice";

//notification
const Greetings = () => {
  Toast.show({
    type: "success",
    text1: "Hello",
  });
};

const Error = () => {
  Toast.show({
    type: "error",
    text1: "Oooopsss...",
  });
};

export const registerDB =
  ({ email, password }) =>
  async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Greetings();
    } catch (error) {
      Error();
      console.log(error.message);
    }
  };

export const updateUserProfile =
  ({ name, image }) =>
  async (dispatch, getState) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: image,
        });

        const { displayName, uid, email, photoURL } = auth.currentUser;

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

export const loginDB =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Greetings();
    } catch (error) {
      Error();
      console.log(error.message);
    }
  };

export const stateChangedUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const updateUserPhoto = (image) => async (dispatch, getState) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        photoURL: image,
      });

      const { photoURL } = auth.currentUser;

      const userUpdateProfile = {
        image: photoURL,
      };

      dispatch(authSlice.actions.updatePhoto(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
    }
  }
};
