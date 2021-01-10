import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { commonStyles } from "../styles/commonStyles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://hanirayis.pythonanywhere.com";
const API_ALL_POSTS = "/posts";
const API_DELETE_POST_ID = "/posts/";
const API_CREATE_POST = "/create";
const API_POSTS_ID = "/posts/";
var namesAsObjects = [];

export default function IndexScreen({ navigation, route }) {
  const [errorMessage, setErrorMessage] = useState("");
  var arrayPosts = [];

  useEffect(() => {
    // Add home icon to header right
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => createPressed()}
        >
          <Text>Create new post</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  // Listener for params back from edit or create screen
  useEffect(() => {
    // Return from EditScreen?
    if (route.params?.action == "edit") {
      console.log("*************** Return from edit! ***************");
      if (route.params?.title || route.params?.content) {
        editPostByID(
          route.params?.title,
          route.params?.content,
          route.params?.id
        );
      }
    }
    // Return from CreateScreen?
    if (route.params?.action == "create") {
      console.log("*************** Return from create! ***************");
      if (route.params?.title || route.params?.content) {
        createPost(route.params?.title, route.params?.content);
      }
    }
    // Return from CreateScreen?
    if (route.params?.action == "show") {
      console.log("*************** Return from show! ***************");
    }
    getPosts();
  }, [route.params?.title, route.params?.content]);

  async function getPosts() {
    // get posts from DB
    console.log("--- Posts retrieving ---");

    try {
      const response = await axios.get(API + API_ALL_POSTS);
      arrayPosts = JSON.parse(JSON.stringify(response.data)); // This will copy values of an array
      // setup name object for flatlist
      namesAsObjects = arrayPosts.map((item) => {
        return {
          name: item,
        };
      });
      console.log("Posts get successful!");
      console.log("arrayPosts:");
      console.log(arrayPosts);
    } catch (error) {
      console.log("Error retrieving posts!");
      console.log(error.response.data.error);
    }
  }

  async function editPostByID(title, content, recID) {
    console.log("--- Post editing ---");
    // Edit posts by ID
    try {
      const response = await axios.put(API + API_POSTS_ID + recID, {
        title,
        content,
      });
      console.log("Post edit successful!");
      console.log("response.data:");
      console.log(response.data);
    } catch (error) {
      console.log("Error retrieving posts!");
      console.log(error.response.data.error);
    }
  }

  async function createPost(title, content) {
    console.log("--- Post creating ---");
    // Create posts to DB
    try {
      const response = await axios.post(API + API_CREATE_POST, {
        title,
        content,
      });
      arrayPost = JSON.parse(JSON.stringify(response.data)); // This will copy values of an array
      console.log("Post create successful!");
      console.log("response.data:");
      console.log(response.data);
      console.log("arrayPost:");
      console.log(arrayPost);
    } catch (error) {
      console.log("Error retrieving posts!");
      console.log(error.response.data.error);
    }
  }

  async function deletePosts(recID) {
    // Delete post from DB
    console.log("--- Posts deleting ---");
    try {
      const response = await axios.delete(API + API_DELETE_POST_ID + recID);
      console.log("Posts delete successful!");
      console.log("response.data:");
      console.log(response.data);
    } catch (error) {
      console.log("Error deleting post!");
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  }

  function createPressed() {
    setErrorMessage("");
    return navigation.navigate("Create");
  }

  function showPressed(recTitle, recContent, recID) {
    setErrorMessage("");
    return navigation.navigate("Show", {
      title: recTitle,
      content: recContent,
      id: recID,
    });
  }

  function deletePressed(recID) {
    //
    deletePosts(recID);
    //
    getPosts();
    return navigation.navigate("Index");
  }

  function blogTabPressed() {
    return navigation.navigate("Index");
  }

  function accountTabPressed() {
    return navigation.navigate("Account");
  }

  function renderPost({ item }) {
    return (
      <View style={styles.renderView}>
        <View style={{ alignItems: "center", width: "10%", marginRight: 20 }}>
          <TouchableOpacity onPress={() => deletePressed(item.name.id)}>
            <MaterialIcons name="highlight-remove" size={20} color="red" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            onPress={() =>
              showPressed(item.name.title, item.name.content, item.name.id)
            }
          >
            <Text style={styles.renderViewText}>{item.name.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            onPress={() =>
              showPressed(item.name.title, item.name.content, item.name.id)
            }
          >
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={{ alignItems: "center", width: "100%", height: "90%" }}>
        <FlatList
          style={{ width: "100%" }}
          data={namesAsObjects}
          renderItem={renderPost}
          keyExtractor={(item) => item.name.id.toString()}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textShow: {
    color: "blue",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    height: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  renderView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "88%",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  renderViewText: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
});
