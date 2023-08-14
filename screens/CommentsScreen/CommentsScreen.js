import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imgPost}>
          <Image source={require("../../assets/img/post.png")} />
        </View>
        <View style={styles.wrapperComments}>
          <View style={styles.comment}>
            <Image
              source={require("../../assets/img/friend.png")}
              style={styles.friendImg}
            />
            <View style={styles.friendComment}>
              <Text style={styles.message}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.time}>09 червня, 2020 | 08:40</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    paddingTop: 32,
  },
  imgPost: {
    height: 240,
    width: "100%",
    marginBottom: 32,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  wrapperComments: {
    marginBottom: 31,
    marginHorizontal: 16,
    marginHorizontal: 16,
  },
  comment: {
    flexDirection: "row",
  },
  friendImg: {
    marginRight: 16,
  },
  friendComment: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default CommentsScreen;
