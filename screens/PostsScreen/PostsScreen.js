import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <View>
          <Image
            source={require("../../assets/img/rectangle.png")}
            style={styles.photoUser}
          />
        </View>
        <View>
          <Text>Natali Romanova</Text>
          <Text>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoUser: {
    width: 60,
    height: 60,
  },
});

export default PostsScreen;
