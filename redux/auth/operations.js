import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const registerDB =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user : ", user);
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

export const loginDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials);
      return credentials;
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
