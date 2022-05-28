import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
//import { useNavigation } from '@react-navigation/native';

function JobOrder({ navigation }) {
  // Navigation to pass to other stacks of Job Order
  function createPageHandler() {
    navigation.navigate("Create");
  }

  function viewPageHandler() {
    navigation.navigate("View");
  }

  function editPageHandler() {
    navigation.navigate("Edit");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Choose one option provided for Job Order:{" "}
      </Text>
      <Button handler={createPageHandler}>Create Job Order</Button>
      <Button handler={viewPageHandler}>View Job Order</Button>
      <Button handler={editPageHandler}>Edit Job Order</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 25,
    marginBottom: 15,
  },
});

export default JobOrder;
