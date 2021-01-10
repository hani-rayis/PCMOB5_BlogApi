import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ShowScreen({ navigation, route }) {
  const [title, setTitle] = useState(route.params.title);
  const [content, setContent] = useState(route.params.content);
  const [id, setID] = useState(route.params.id);

  // ****************************************
  // Start when loaded
  // ****************************************
  useEffect(() => {
    // Add home icon to header right
    navigation.setOptions({
      headerRight: () => 
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => editPressed(title, content, id)}>
          <MaterialCommunityIcons name="file-document-edit-outline" size={40} color="black" />
        </TouchableOpacity>,
    });
  }, []);

  function editPressed(recTitle, recContent, recID) {
    return navigation.navigate("Edit", {title: recTitle, content: recContent, id: recID});
  }

  function backPressed() {
    return navigation.navigate("Index", {action: "show"});
  }

  return (
    <View style={commonStyles.container}>
      <Text>Show Screen</Text>
      <Text>Title: {title}</Text>
      <Text>Content: {content}</Text>
      <TouchableOpacity style={[ styles.button, styles.buttonBack ]} onPress={() => backPressed()}>
          <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    padding: 5,
    color: "white",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonBack: {
    backgroundColor: 'green',
  },
});

