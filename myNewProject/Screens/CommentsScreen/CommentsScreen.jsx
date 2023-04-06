import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore";

export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { login } = useSelector((state) => state.auth);

  const getAllComments = async () => {
    const docRef = await doc(db, "posts", postId);
    onSnapshot(collection(docRef, "comments"), (posts) => {
      setAllComments(posts.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const createCommentToPost = () => {
    uploadCommentToServer();
    keyboardHide();
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const uploadCommentToServer = async () => {
    const docRef = await doc(db, "posts", postId);
    const createComment = await addDoc(collection(docRef, "comments"), {
      comment,
      login,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.box}>
          <Image source={{ uri: photo }} style={styles.image} />
          <FlatList
            data={allComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback>
                <View style={styles.list}>
                  <Text style={styles.listComment}>{item.comment}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />

          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              paddingLeft={16}
              value={comment}
              onChangeText={(value) => setComment(value)}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={createCommentToPost}
          >
            <AntDesign name="arrowup" size={34} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    justifyContent: "flex-end",
  },

  image: {
    width: "100%",
    height: 240,
    marginTop: 32,
    borderRadius: 8,
  },

  list: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 16,
  },

  listComment: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#00000008",
    color: "#212121",
    padding: 16,
  },

  wrapper: {
    position: "relative",
    marginBottom: 16,
  },

  input: {
    marginHorizontal: 16,
    border: "1px solid #E8E8E8",
    height: 50,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 19,
    boxSizing: "border-box",
    borderRadius: 100,
    fontFamily: "Roboto-Regular",
  },

  btn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    bottom: 22,
    right: 30,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});
