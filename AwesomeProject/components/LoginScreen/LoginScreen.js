import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../../assets/img/photoBG.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.containerForm}>
        <View style={styles.photoUser}>
          <TouchableOpacity style={styles.btnAdd} activeOpacity={0.8}>
            <Image
              source={require("../../assets/img/add.png")}
              style={styles.btnAdd}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.form}>
          <View style={styles.marginBottom}>
            <TextInput style={styles.input} placeholder="Логін" />
          </View>
          <View style={styles.marginBottom}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            />
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Пароль" />
            <TouchableOpacity activeOpacity={0.8} style={styles.showPassword}>
              <Text>Показати</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.btnTitle}>Зареєстуватися</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.link}>Вже є акаунт? Увійти</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerForm: {
    height: 549,
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
    top: "50%",
    transform: [{ translateX: -60 }, { translateY: -335 }],
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

export default LoginScreen;
