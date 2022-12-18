import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";

function Invoices({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <Text>Invoices Screen!</Text>
      </View>
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
});

export default Invoices;
