import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { authSignOutUser, updateUserPhoto } from "../../redux/auth/operations";
import { useSelector } from "react-redux";
import { getDataFromFirestore } from "../../firebase/service";

//storage image
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uriToBlob } from "../../utils/uriToBlob";

//svg
import AddUserPhoto from "../../assets/svg/addPhotoUser.svg";
import DeleteUserPhoto from "../../assets/svg/deleteUserPhoto.svg";
import LogOut from "../../assets/svg/logOut.svg";
import Comments from "../../assets/svg/message-circle.svg";
import Likes from "../../assets/svg/thumbs-up.svg";
import Map from "../../assets/svg/map-pin.svg";

const ProfileScreen = () => {
  const [posts, setPosts] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromFirestore();
      const filteredPosts = data.filter(
        (post) => post.data.userId === user.userId
      );
      setPosts(filteredPosts);
    };

    fetchData();
  }, [posts]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      photoLink = await uploadPhotoToServer({
        uri: asset.uri,
        mimeType: asset.uri.split(".").pop(),
      });
      console.debug(photoLink);
      dispatch(updateUserPhoto(photoLink));
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
            onPress={() => dispatch(authSignOutUser())}
          >
            <LogOut />
          </TouchableOpacity>
          <View style={styles.wrapperPhoto}>
            <View style={styles.containerPhoto}>
              {user.image && (
                <Image source={{ uri: user.image }} style={styles.imageUser} />
              )}
              {user.image ===
              "https://sneg.top/uploads/posts/2023-06/1687881723_sneg-top-p-avatarka-yuzer-vkontakte-2.jpg" ? (
                <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                  <AddUserPhoto style={styles.btnAdd} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    dispatch(
                      updateUserPhoto(
                        "https://sneg.top/uploads/posts/2023-06/1687881723_sneg-top-p-avatarka-yuzer-vkontakte-2.jpg"
                      )
                    )
                  }
                >
                  <DeleteUserPhoto style={styles.btnDelete} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.nameUser}>{user.name}</Text>
          <ScrollView style={styles.wrapperPosts}>
            {posts ? (
              posts.map(({ id, data }) => {
                const {
                  photo,
                  titlePost,
                  titleLocation,
                  // coords,
                  // userId,
                  // name,
                  // image,
                } = data;
                return (
                  <View style={styles.item} key={id}>
                    <Image source={{ uri: photo }} style={styles.imgPost} />
                    <Text style={styles.titlePost}>{titlePost}</Text>
                    <View style={styles.info}>
                      <View style={styles.containerMessage}>
                        <TouchableOpacity
                          style={{
                            ...styles.containerMessage,
                            ...styles.marginRight,
                          }}
                          activeOpacity={0.6}
                          onPress={() =>
                            navigation.navigate("Comments", { postId: id })
                          }
                        >
                          <Comments />
                          <Text style={styles.countComments}>{2}</Text>
                        </TouchableOpacity>
                        <View style={styles.containerMessage}>
                          <Likes />
                          <Text style={styles.countComments}>{3}</Text>
                        </View>
                      </View>
                      <View style={styles.containerLocation}>
                        <Map />
                        <Text style={styles.location}>{titleLocation}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text>Не має постів</Text>
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
    top: -39,
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
