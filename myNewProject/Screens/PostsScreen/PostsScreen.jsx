import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { width } = useWindowDimensions();

  const getAllPost = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          source={require("../../assets/images/Rectangle.jpg")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemUri}>
            <Image
              source={{ uri: item.photo }}
              style={{ ...styles.image, width: width - 32 }}
            />
            <View>
              <Text style={styles.nameComment}>{item.title}</Text>
            </View>

            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.commentText}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    photo: item.photo,
                  })
                }
              >
                <EvilIcons
                  name="comment"
                  size={24}
                  color="#bdbdbd"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.comments}></Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.location}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <EvilIcons
                  name="location"
                  size={24}
                  color="#bdbdbd"
                  style={{ marginRight: 4 }}
                />
                <View>
                  <Text style={styles.placeMap}>{item.locationName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginTop: 32,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  userEmail: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
  },
  itemUri: {
    marginBottom: 32,
  },
  image: {
    borderRadius: 8,
    height: 240,
  },
  nameComment: {
    marginTop: 8,
    alignSelf: "flex-start",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentText: {
    marginRight: 10,
    maxWidth: "20%",
    flexDirection: "row",
  },
  comments: {
    color: "#bdbdbd",
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    maxWidth: "80%",
    flexDirection: "row",
  },
  placeMap: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
