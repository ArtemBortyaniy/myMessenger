import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const data = [
  {
    id: 1,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: 2,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: 3,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: 4,
    img: require("../../assets/img/post.png"),
    title: "Ліс",
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
];

const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <View style={styles.photoUser}>
          <Image source={require("../../assets/img/rectangle.png")} />
        </View>
        <View style={styles.infoUser}>
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <Text style={styles.emailUser}>email@example.com</Text>
        </View>
      </View>
      <ScrollView style={styles.containerPosts}>
        {data.map(({ id, img, title, commentsCount, location }) => {
          return (
            <View style={styles.item} key={id}>
              <Image source={img} style={styles.imgPost} />
              <Text style={styles.titlePost}>{title}</Text>
              <View style={styles.info}>
                <TouchableOpacity
                  style={styles.containerMessage}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Кометарі")}
                >
                  <Image
                    source={require("../../assets/img/message-circle.png")}
                  />
                  <Text style={styles.countComments}>{commentsCount}</Text>
                </TouchableOpacity>
                <View style={styles.containerLocation}>
                  <Image source={require("../../assets/img/map-pin.png")} />
                  <Text style={styles.location}>{location}</Text>
                </View>
              </View>
            </View>
          );
        })}
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
    marginRight: "auto",
  },
  countComments: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "400",
  },
  containerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: 4,
    fontWeight: "400",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
