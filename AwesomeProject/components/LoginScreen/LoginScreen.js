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

const LoginScreen = () => {
  const [visibleKeyboard, setVisibleKeyboard] = useState(false);
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
    if (email === "" || password === "") {
      alert("Заповніть усі поля");
      return;
    }
    handleCloseKeyboard();
    reset();
    console.log({ email, password });
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
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
                ios: { height: visibleKeyboard ? 585 : 489 },
                android: { height: visibleKeyboard ? 560 : 489 },
              }),
            }}
          >
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.form}>
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
                  <Text>{secureTextEntry ? "Показати" : "Сховати"}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => handleOnSubmitEditing()}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.link}>
                Немає акаунту?{" "}
                <Text style={styles.linkRegister}>Зареєструватися</Text>
              </Text>
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
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  form: {
    marginHorizontal: 16,
    position: "relative",
  },
  title: {
    fontWeight: "500",
    color: "#212121",
    fontSize: 30,
    marginTop: 32,
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
  linkRegister: {
    textDecorationLine: "underline",
    fontSize: 16,
    color: "#1B4371",
  },
});

export default LoginScreen;
