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
  Platform,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const RegistrationScreen = () => {
  const [visibleKeyboard, setVisibleKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleChanche = () => {
    setVisibleKeyboard(true);
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss(), setVisibleKeyboard(false);
  };

  const handleOnSubmitEditing = () => {
    if ((login === "", email === "" || password === "")) {
      alert("Заповніть усі поля");
      return;
    }
    handleCloseKeyboard();
    reset();
    console.log({ login, email, password });
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const openGallery = async () => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        setSelectedImage(source);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleCloseKeyboard()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/img/photoBG.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View
            style={{
              ...styles.containerForm,
              ...Platform.select({
                ios: { height: visibleKeyboard ? 710 : 549 },
                android: { height: visibleKeyboard ? 685 : 549 },
              }),
            }}
          >
            <View
              style={{
                ...styles.photoUser,
                bottom: !visibleKeyboard ? "78%" : "83%",
              }}
            >
              <TouchableOpacity
                style={styles.btnAdd}
                activeOpacity={0.8}
                onPress={() => openGallery()}
              >
                <Image
                  source={require("../../assets/img/add.png")}
                  style={styles.btnAdd}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.form}>
              <View style={styles.marginBottom}>
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  value={login}
                  onFocus={() => handleChanche()}
                  onChangeText={setLogin}
                  onSubmitEditing={handleOnSubmitEditing}
                />
              </View>
              <View style={styles.marginBottom}>
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onFocus={() => handleChanche()}
                  onChangeText={setEmail}
                  onSubmitEditing={handleOnSubmitEditing}
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  value={password}
                  onFocus={() => handleChanche()}
                  onChangeText={setPassword}
                  onSubmitEditing={handleOnSubmitEditing}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.showPassword}
                  onPress={toggleSecureEntry}
                >
                  <Text>
                    <Text>{secureTextEntry ? "Показати" : "Сховати"}</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => handleOnSubmitEditing()}
              >
                <Text style={styles.btnTitle}>Зареєстуватися</Text>
              </TouchableOpacity>
              <Text style={styles.link}>Вже є акаунт? Увійти</Text>
            </View>
          </View>
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
    // height: 549,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  form: {
    marginHorizontal: 16,
    position: "relative",
  },
  photoUser: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
    position: "absolute",
    left: "50%",
    // bottom: "78%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  btnAdd: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 53,
    bottom: 14,
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
