import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export const data = [
  {
    id: 1,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 3,
    likesCount: 2,
    country: "Ukraine",
  },
  {
    id: 2,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 3,
    likesCount: 2,
    country: "Ukraine",
  },
  {
    id: 3,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 3,
    likesCount: 2,
    country: "Ukraine",
  },
  {
    id: 4,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 3,
    likesCount: 2,
    country: "Ukraine",
  },
];

const ProfileScreen = () => {
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

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
      <ImageBackground
        source={require("../../assets/img/photoBG.png")}
        resizeMode="stretch"
        style={styles.image}
      >
        <View style={styles.wrapperUser}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logOut}
            onPress={() => navigation.navigate("Login")}
          >
            <Image source={require("../../assets/img/log-out.png")} />
          </TouchableOpacity>
          <View style={styles.wrapperPhoto}>
            <View style={styles.containerPhoto}>
              {image && (
                <Image source={{ uri: image }} style={styles.imageUser} />
              )}
              {!image ? (
                <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                  <Image
                    source={require("../../assets/img/add.png")}
                    style={styles.btnAdd}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setImage(null)}
                >
                  <Image
                    source={require("../../assets/img/delete.png")}
                    style={styles.btnDelete}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <ScrollView style={styles.wrapperPosts}>
            {data.map(
              ({ id, img, title, commentsCount, country, likesCount }) => {
                return (
                  <View style={styles.item} key={id}>
                    <Image source={img} style={styles.imgPost} />
                    <Text style={styles.titlePost}>{title}</Text>
                    <View style={styles.info}>
                      <View style={styles.containerMessage}>
                        <TouchableOpacity
                          style={{
                            ...styles.containerMessage,
                            ...styles.marginRight,
                          }}
                          activeOpacity={0.6}
                          onPress={() => navigation.navigate("Кометарі")}
                        >
                          <Image
                            source={require("../../assets/img/comments.png")}
                          />
                          <Text style={styles.countComments}>
                            {commentsCount}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.containerMessage}>
                          <Image
                            source={require("../../assets/img/likes.png")}
                          />
                          <Text style={styles.countComments}>{likesCount}</Text>
                        </View>
                      </View>
                      <View style={styles.containerLocation}>
                        <Image
                          source={require("../../assets/img/map-pin.png")}
                        />
                        <Text style={styles.location}>{country}</Text>
                      </View>
                    </View>
                  </View>
                );
              }
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
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
  logOut: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 16,
    top: 22,
  },
  wrapperUser: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 200,
    width: "100%",
    marginTop: 147,
    borderRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
  nameUser: {
    marginTop: 92,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
  },
  wrapperPosts: {
    marginBottom: 43,
    marginHorizontal: 16,
  },
  item: {
    marginTop: 32,
  },
  imgPost: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  titlePost: {
    fontWeight: "700",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
    marginTop: 8,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerMessage: {
    flexDirection: "row",
    alignItems: "center",
  },
  countComments: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "400",
  },
  containerLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  location: {
    marginLeft: 4,
    fontWeight: "400",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  marginRight: {
    marginRight: 24,
  },
});

export default ProfileScreen;
