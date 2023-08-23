import Toast from "react-native-toast-message";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const Successful = () => {
  Toast.show({
    type: "success",
    text1: "Successful",
  });
};

//posts
export const writeDataToFirestore = async ({
  photo,
  titlePost,
  titleLocation,
  coords,
  userId,
  name,
  image,
  likes,
}) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      photo,
      titlePost,
      titleLocation,
      coords,
      userId,
      name,
      image,
      likes,
    });
    Successful();
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    return snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (docId, like) => {
  try {
    const ref = doc(db, "posts", docId);

    await updateDoc(ref, {
      likes: like,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};

//comments
export const writeDataToCommets = async (
  postId,
  comment,
  image,
  time,
  userId
) => {
  try {
    const commentsCollection = collection(db, "posts", postId, "comments");
    await addDoc(commentsCollection, {
      comment,
      image,
      time,
      userId,
    });
    Successful();
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataFromComments = async (postId) => {
  try {
    const commentsCollection = collection(db, "posts", postId, "comments");
    const snapshot = await getDocs(commentsCollection);
    console.log(
      "====>data",
      snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
    return snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
