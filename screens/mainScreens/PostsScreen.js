import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  getDataFromFirestore,
  updateDataInFirestore,
} from "../../firebase/service";

//svg
import Comments from "../../assets/svg/message-circle.svg";
import Likes from "../../assets/svg/thumbs-up.svg";
import Map from "../../assets/svg/map-pin.svg";

const PostsScreen = () => {
  const [posts, setPosts] = useState(null);
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromFirestore();
      setPosts(data);
    };

    fetchData();
  }, [posts]);

  const handleChangeLike = async (id, isLike, likes) => {
    if (!isLike) {
      await updateDataInFirestore(id, true, likes + 1);
    } else {
      await updateDataInFirestore(id, false, likes - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <View style={styles.photoUser}>
          {user.image && (
            <Image
              source={{ uri: user.image }}
              style={{ width: 60, height: 60, borderRadius: 16 }}
            />
          )}
        </View>
        <View style={styles.infoUser}>
          <Text style={styles.nameUser}>{user.name}</Text>
          <Text style={styles.emailUser}>{user.email}</Text>
        </View>
      </View>
      <ScrollView>
        {posts ? (
          posts.map(({ id, data }) => {
            const {
              photo,
              titlePost,
              titleLocation,
              coords,
              userId,
              name,
              image,
              likes,
              commentCount,
              isLike,
            } = data;

            return (
              <View style={styles.item} key={id}>
                <View style={styles.contairSender}>
                  <Image source={{ uri: image }} style={styles.imgUserPost} />
                  <Text style={styles.nameUserPost}>{name}</Text>
                </View>
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
                        navigation.navigate("Comments", {
                          postId: id,
                          postImg: photo,
                        })
                      }
                    >
                      <Comments />
                      <Text style={styles.count}>{commentCount}</Text>
                    </TouchableOpacity>
                    <View style={styles.containerMessage}>
                      <TouchableOpacity
                        style={styles.containerMessage}
                        onPress={() => handleChangeLike(id, isLike, likes)}
                      >
                        <Likes />
                        <Text style={styles.count}>{likes}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.containerLocation}>
                    <TouchableOpacity
                      style={styles.containerMessage}
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: coords,
                        })
                      }
                    >
                      <Map />
                      <Text style={styles.location}>{titleLocation}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  photoUser: {
    width: 60,
    height: 60,
  },
  infoUser: {
    marginLeft: 8,
  },
  nameUser: {
    fontSize: 13,
    fontWeight: "700",
    color: "#212121",
  },
  emailUser: {
    color: "#212121CC",
    fontSize: 11,
  },
  item: {
    marginBottom: 32,
  },
  contairSender: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imgUserPost: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 5,
  },
  nameUserPost: {
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  imgPost: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  titlePost: {
    marginBottom: 8,
    marginTop: 8,
    fontWeight: "700",
    fontSize: 16,
    color: "#212121",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerMessage: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
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

export default PostsScreen;
