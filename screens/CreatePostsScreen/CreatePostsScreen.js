import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreatePostsScreen = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ ...styles.marginHorizontal, ...styles.marginBottom }}>
        {!image ? (
          <>
            <TouchableOpacity
              style={styles.imgPost}
              onPress={pickImage}
              activeOpacity={0.6}
            >
              <Image
                source={require("../../assets/img/addPhotoPost.png")}
                onPress={pickImage}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Завантажте фото</Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={pickImage}
              style={styles.imgPost}
            >
              <Image source={{ uri: image }} style={styles.changePhoto} />
              <Image
                source={require("../../assets/img/group.png")}
                style={styles.editImg}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.text}>Редагувати фото</Text>
          </>
        )}
      </View>
      <View style={{ ...styles.marginHorizontal, ...styles.marginBottom }}>
        <View>
          <TextInput placeholder="Назва..." style={{ ...styles.input }} />
        </View>
        <View>
          <TextInput
            placeholder="Місцевість..."
            style={{ ...styles.input, ...styles.inputLocation }}
          />
          <Image
            source={require("../../assets/img/map-pin.png")}
            style={styles.imgLocation}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ ...styles.marginHorizontal, ...styles.btnSubmit }}
        >
          <Text style={styles.btnText}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.clearPost}>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnClear}>
          <Image source={require("../../assets/img/clearPost.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 32,
  },
  imgPost: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 8,
  },
  changePhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  editImg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  text: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
  },
  input: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontWeight: "400",
    color: "#BDBDBD",
    paddingTop: 16,
    paddingBottom: 15,
  },
  inputLocation: {
    paddingLeft: 28,
  },
  imgLocation: {
    position: "absolute",
    left: 0,
    top: 13,
    width: 24,
    height: 24,
  },
  btnSubmit: {
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
    borderRadius: 100,
  },
  btnText: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
  },
  clearPost: {
    marginTop: "auto",
    marginBottom: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  btnClear: {
    width: 70,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
});

export default CreatePostsScreen;
