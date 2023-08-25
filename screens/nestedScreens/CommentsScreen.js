import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  writeDataToCommets,
  getDataFromComments,
} from "../../firebase/service";
import moment from "moment";
import "moment/locale/uk";

const CommentsScreen = () => {
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);

  const route = useRoute();
  const postId = route.params?.postId;
  const postImg = route.params?.postImg;
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const getCollectioncComments = async () => {
      const data = await getDataFromComments(postId);
      setAllComments(data);
      allComments.map(({ data, id }) => console.log("data =>", data, id));
    };

    getCollectioncComments();
  }, [setAllComments]);

  const addCommentsToPost = async () => {
    await writeDataToCommets(
      postId,
      comment,
      user.image,
      getCurrenttime(),
      user.userId
    );
    setComment(null);
  };

  const getCurrenttime = () => {
    return moment().locale("uk").format("DD MMMM, YYYY | HH:mm");
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleCloseKeyboard()}>
        <View style={styles.wrapper}>
          <View style={styles.imgPostWrapper}>
            <Image source={{ uri: postImg }} style={styles.imgPost} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        {allComments !== [] ? (
          allComments.map(({ id, data }) => {
            const { comment, image, time, userId } = data;

            if (userId === user.userId) {
              return (
                <View style={styles.item} key={id}>
                  <View style={styles.wrapperMyMessage}>
                    <Text style={styles.message}>{comment}</Text>
                    <Text style={styles.timeMyMessage}>{time}</Text>
                  </View>
                  <View style={styles.wrapperMyImg}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: 28, height: 28, borderRadius: 50 }}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.item} key={id}>
                  <View style={styles.wrapperImgFriend}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: 28, height: 28, borderRadius: 50 }}
                    />
                  </View>
                  <View style={styles.wrapperMessage}>
                    <Text style={styles.message}>{comment}</Text>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
              );
            }
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
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
    backgroundColor: "#FFFFFF",
    height: 200,
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
