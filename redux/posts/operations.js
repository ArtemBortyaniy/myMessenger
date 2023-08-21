import Toast from "react-native-toast-message";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const writeDataToFirestore = async ({
  imgPost,
  title,
  location,
  cords,
  userId,
}) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      imgPost: imgPost,
      title: title,
      location: location,
      cords: cords,
      userId: userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    // Перевіряємо у консолі отримані дані
    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    // Повертаємо масив обʼєктів у довільній формі
    return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
