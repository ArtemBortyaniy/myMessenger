import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

//storage image
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uriToBlob } from "../../utils/uriToBlob";

//creacte post
import { useSelector } from "react-redux";
import { writeDataToFirestore } from "../../firebase/service";

//svg
import Editphoto from "../../assets/svg/editPhoto.svg";
import Map from "../../assets/svg/map-pin.svg";
import Trash from "../../assets/svg/trash.svg";

const CreatePostsScreen = () => {
  //inputs
  const [titlePost, setTitlePost] = useState("");
  const [titleLocation, setTitleLocation] = useState("");
  //camera
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //photo
  const [photo, setPhoto] = useState(null);
  //loader
  const [isLoading, setIsLoading] = useState(false);
  //navigation
  const navigation = useNavigation();
  //userId
  const { userId, name, image } = useSelector((state) => state.auth);

  //location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  //camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //submit
  const handleSubmit = async () => {
    if (titleLocation === "" || titlePost === "" || photo === null) {
      Info();
      return;
    } else {
      try {
        setIsLoading(true);
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        writeDataToFirestore({
          photo,
          titlePost,
          titleLocation,
          coords,
          userId,
          name,
          image,
          likes: 0,
          isLike: false,
          commentCount: 0,
        });

        navigation.navigate("Posts");
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setIsLoading(false);
        clearPost();
      }
    }
  };

  //reset
  const clearPost = () => {
    setTitlePost("");
    setTitleLocation("");
    setPhoto(null);
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const Info = () => {
    Toast.show({
      type: "info",
      text1: "Fill in all fields and add a photo",
    });
  };

  const uploadPhotoToServer = async ({ uri, mimeType }) => {
    const uniqueIdUserAvatar = Date.now().toString();
    const fileRef = ref(storage, `userPosts/${uniqueIdUserAvatar}.${mimeType}`);

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
        <View style={[styles.marginHorizontal, styles.marginBottom]}>
          <View>
            {!photo ? (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();

                        const asset = uri;

                        photoLink = await uploadPhotoToServer({
                          uri: asset,
                          mimeType: asset.split(".").pop(),
                        });
                        setPhoto(photoLink);
                      }
                    }}
                  >
                    <View style={styles.takePhotoOut}>
                      <View style={styles.takePhotoInner}></View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      {" "}
                      Flip{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            ) : (
              <View style={styles.wrapperPhoto}>
                <Image source={{ uri: photo }} style={styles.imgPost} />
                <TouchableOpacity
                  onPress={() => setPhoto(null)}
                  style={styles.editImg}
                >
                  <Editphoto />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={styles.text}>Завантажте фото</Text>
        </View>
        <View style={{ ...styles.marginHorizontal, ...styles.marginBottom }}>
          <View>
            <TextInput
              placeholder="Назва..."
              style={{ ...styles.input }}
              value={titlePost}
              onChangeText={setTitlePost}
              onSubmitEditing={handleSubmit}
            />
          </View>
          <View>
            <TextInput
              placeholder="Місцевість..."
              style={{ ...styles.input, ...styles.inputLocation }}
              value={titleLocation}
              onChangeText={setTitleLocation}
              onSubmitEditing={handleSubmit}
            />
            <Map style={styles.imgLocation} />
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.marginHorizontal, ...styles.btnSubmit }}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>
              {!isLoading ? "Опубліковати" : "Завантаження..."}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clearPost}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={clearPost}
            disabled={isLoading}
          >
            <Trash style={{ width: 70, height: 40 }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  button: { alignItems: "center", marginTop: 180 },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  wrapperPhoto: {},
  imgPost: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  flipContainer: {
    position: "absolute",
    bottom: "2%",
    left: "2%",
  },
  editImg: {
    position: "absolute",
    left: "42%",
    top: "38%",
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 32,
  },
  text: {
    marginTop: 8,
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
  },
  input: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontWeight: "400",
    color: "#212121",
    paddingTop: 16,
    paddingBottom: 15,
  },
  inputLocation: {
    paddingLeft: 28,
  },
  imgLocation: {
    position: "absolute",
    left: 0,
    top: "27%",
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
});

export default CreatePostsScreen;
