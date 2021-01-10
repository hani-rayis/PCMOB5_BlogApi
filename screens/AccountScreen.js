import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  function index() {
    AsyncStorage.removeItem("token");
    navigation.navigate("Index");
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Button title="Sign out" onPress={signOut} />
     
      <Button title="Blog" onPress={index} />
    </View>
  );
}

const styles = StyleSheet.create({});
