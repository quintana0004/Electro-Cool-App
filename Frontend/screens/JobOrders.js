import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";

function JobOrders({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    zIndex: -1,
  },
  btn: {
    marginVertical: 20,
  },
});

export default JobOrders;
