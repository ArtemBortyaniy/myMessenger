import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  writeDataToCommets,
  getDataFromFirestore,
  getDataFromComments,
} from "../../firebase/service";
import moment from "moment";
import "moment/locale/uk";

const CommentsScreen = () => {
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState(null);

  const route = useRoute();
  const postId = route.params?.postId;
  const postImg = route.params?.postImg;
  const { image, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCollectioncComments = async () => {
      const data = getDataFromComments(postId);
      setAllComments(data);
    };

    getCollectioncComments();
  }, [setAllComments]);

  const addCommentsToPost = async () => {
    await writeDataToCommets(postId, comment, image, getCurrenttime(), userId);
    setComment(null);
  };

  const getCurrenttime = () => {
    return moment().locale("uk").format("DD MMMM, YYYY | HH:mm");
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleCloseKeyboard()}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.imgPostWrapper}>
            <Image source={{ uri: postImg }} style={styles.imgPost} />
          </View>
        </View>
        <View>
          <View style={styles.item}>
            <View style={styles.wrapperImgFriend}>
              <Image source={require("../../assets/img/friend.png")} />
            </View>
            <View style={styles.wrapperMessage}>
              <Text style={styles.message}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.time}>09 червня, 2020 | 08:40</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.wrapperMyMessage}>
              <Text style={styles.message}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={styles.timeMyMessage}>09 червня, 2020 | 09:14</Text>
            </View>
            <View style={styles.wrapperMyImg}>
              <Image source={require("../../assets/img/userPhoto.png")} />
            </View>
          </View>
        </View>
        <View style={styles.wrapperAddComment}>
          <TextInput
            placeholder="Коментувати..."
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={addCommentsToPost}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imgPostWrapper: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  wrapper: {
    paddingTop: 32,
  },
  imgPost: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  item: {
    marginHorizontal: 16,
    flexDirection: "row",
    marginBottom: 24,
  },
  wrapperImgFriend: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  wrapperMessage: {
    flex: 1,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
  },
  message: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  time: {
    fontWeight: "400",
    fontSize: 10,
    color: "#BDBDBD",
    lineHeight: 12,
    marginLeft: "auto",
  },
  wrapperMyImg: {
    width: 28,
    height: 28,
    marginLeft: 16,
  },
  wrapperMyMessage: {
    flex: 1,
    borderRadius: 6,
    borderTopRightRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
  },
  timeMyMessage: {
    fontWeight: "400",
    fontSize: 10,
    color: "#BDBDBD",
    lineHeight: 12,
    marginRight: "auto",
  },
  wrapperAddComment: {
    marginTop: 7,
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  input: {
    padding: 16,
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 100,
  },
});

export default CommentsScreen;
