import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleOnSubmitEditing = () => {
    if (email === "" || password === "") {
      alert("Заповніть усі поля");
      return;
    }
    handleCloseKeyboard();
    reset();
    console.log({ email, password });
    navigation.navigate("Home");
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
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flexGrow: 1, justifyContent: "flex-end" }}
            keyboardVerticalOffset={-240}
          >
            <View style={styles.containerForm}>
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.form}>
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
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Немає акаунту?{" "}
                  <Text style={styles.linkRegister}>Зареєструватися</Text>
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
    height: 489,
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
