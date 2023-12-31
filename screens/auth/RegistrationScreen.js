import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { registerDB, updateUserProfile } from "../../redux/auth/operations";

//storage image
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uriToBlob } from "../../utils/uriToBlob";

//svg
import AddUserPhoto from "../../assets/svg/addPhotoUser.svg";
import DeleteUserPhoto from "../../assets/svg/deleteUserPhoto.svg";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const Info = () => {
    Toast.show({
      type: "info",
      text1: "Fill in all fields and add a photo",
    });
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleOnSubmitEditing = async () => {
    handleCloseKeyboard();
    if ((name === "" || email === "", password === "", image === null)) {
      Info();
      return;
    } else {
      await dispatch(registerDB({ email, password }));
      dispatch(updateUserProfile({ name, image }));
      reset();
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const asset = result.assets[0];

      photoLink = await uploadPhotoToServer({
        uri: asset.uri,
        mimeType: asset.uri.split(".").pop(),
      });
      setImage(photoLink);
    }
  };

  const uploadPhotoToServer = async ({ uri, mimeType }) => {
    const uniqueIdUserAvatar = Date.now().toString();
    const fileRef = ref(
      storage,
      `userAvatar/${uniqueIdUserAvatar}.${mimeType}`
    );

    try {
      const blob = await uriToBlob(uri);
      const uploadedFile = await uploadBytes(fileRef, blob);
      return await getDownloadURL(uploadedFile.ref);
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleCloseKeyboard()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/img/photoBG.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flexGrow: 1, justifyContent: "flex-end" }}
            keyboardVerticalOffset={-180}
          >
            <View style={{ ...styles.containerForm, paddingBottom: 80 }}>
              <View style={styles.wrapperPhoto}>
                <View style={styles.containerPhoto}>
                  {image && (
                    <Image source={{ uri: image }} style={styles.imageUser} />
                  )}
                  {!image ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                      <AddUserPhoto style={styles.btnAdd} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setImage(null)}
                    >
                      <DeleteUserPhoto style={styles.btnDelete} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.form}>
                <View style={styles.marginBottom}>
                  <TextInput
                    style={styles.input}
                    placeholder="Логін"
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={handleOnSubmitEditing}
                  />
                </View>
                <View style={styles.marginBottom}>
                  <TextInput
                    style={styles.input}
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={handleOnSubmitEditing}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={handleOnSubmitEditing}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.showPassword}
                    onPress={toggleSecureEntry}
                  >
                    <Text>{secureTextEntry ? "Показати" : "Сховати"}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={() => handleOnSubmitEditing()}
                >
                  <Text style={styles.btnTitle}>Зареєстуватися</Text>
                </TouchableOpacity>
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є акаунт? Увійти
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
  },
  wrapperPhoto: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPhoto: {
    width: 120,
    height: 120,
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imageUser: {
    flex: 1,
    borderRadius: 16,
  },
  btnAdd: {
    position: "absolute",
    right: -12,
    top: 81,
    width: 25,
    height: 25,
  },
  btnDelete: {
    position: "absolute",
    right: -19,
    top: -47,
    width: 39,
    height: 39,
  },
  form: {
    marginHorizontal: 16,
    position: "relative",
  },
  title: {
    fontWeight: "500",
    color: "#212121",
    fontSize: 30,
    marginTop: 92,
    textAlign: "center",
    marginBottom: 33,
  },
  marginBottom: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#E8E8E8",
    height: 50,
    padding: 16,
    fontSize: 16,
    color: "#BDBDBD",
    borderRadius: 6,
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  btnShowPassword: {
    color: "#1B4371",
    fontSize: 16,
  },
  btn: {
    marginTop: 43,
    backgroundColor: `#FF6C00`,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    height: 51,
    marginBottom: 16,
  },
  btnTitle: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  link: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RegistrationScreen;
