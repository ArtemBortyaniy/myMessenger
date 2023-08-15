import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const CreatePostsScreen = () => {
  const [titlePost, setTitlePost] = useState("");
  const [titleLocation, setTitleLocation] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();
  }, [location]);

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

  const handleSubmit = () => {
    console.log(titlePost, titleLocation, location);
    clearPost();
  };

  const clearPost = () => {
    setTitlePost("");
    setTitleLocation("");
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.marginHorizontal,
          styles.marginBottom,
          styles.wrapperCamera,
        ]}
      >
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                }
              }}
            >
              <Image source={require("../../assets/img/addPhotoPost.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.flipView}>
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <Text style={styles.text}>Завантажте фото</Text>
      </View>
      <View style={{ ...styles.marginHorizontal, ...styles.marginBottom }}>
        <View>
          <TextInput
            placeholder="Назва..."
            style={{ ...styles.input }}
            value={titlePost}
            onChangeText={setTitlePost}
          />
        </View>
        <View>
          <TextInput
            placeholder="Місцевість..."
            style={{ ...styles.input, ...styles.inputLocation }}
            value={titleLocation}
            onChangeText={setTitleLocation}
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
          onPress={handleSubmit}
        >
          <Text style={styles.btnText}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.clearPost}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnClear}
          onPress={clearPost}
        >
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
  wrapperCamera: {
    borderRadius: 8,
  },
  camera: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  photoView: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -27 }, { translateY: -40 }],
  },
  flipView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {},
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

{
  /* <View style={{ ...styles.marginHorizontal, ...styles.marginBottom }}>
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
</View>; */
}
