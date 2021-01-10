import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function CreateScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function createPressed() {
    return navigation.navigate("Index", {title: title, content: content, action: "create"});
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Text style={styles.textLabel}>Create a post</Text>
        <Text style={styles.textLabel2}>Title</Text>
        <TextInput
          placeholder= "Enter title..."
          style= {styles.textInput}
          value={title}
          onChangeText={(input) => setTitle(input)}
          onTextInput ={() => setErrorMessage("")}
          autoCorrect = {false}
        >
        </TextInput>
        <Text style={styles.textLabel2}>Content</Text>
        <TextInput
          placeholder= "Enter content..."
          style= {styles.textInput2}
          value={content}
          onChangeText={(input) => setContent(input)}
          onTextInput ={() => setErrorMessage("")}
          autoCorrect = {false}
        >
        </TextInput>
        <TouchableOpacity style={[ styles.button, styles.buttonSubmit ]} onPress={() => createPressed()}>
          <Text style={ styles.buttonText }>Create</Text>
        </TouchableOpacity>
        <Text style= { styles.errorText }>{errorMessage}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textLabel:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  textLabel2:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
    marginTop: 0,
    justifyContent: "center",
  },
  textInput2: {
    margin: 20,
    borderWidth: 1,
    width: "90%",
    height: "30%",
    padding: 10,
    borderColor: "#ccc",
    marginTop: 0,
    justifyContent: "center",
  },
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
  buttonSubmit: {
    backgroundColor: 'darkblue',
  },
  textSignUp: {
    color: "blue",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    height: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
