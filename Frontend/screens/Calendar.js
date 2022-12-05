import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";

function Calendar({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={8} colorHeader={Colors.darkBlack} divideW={1}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <Text>Calendar Screen!</Text>
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

export default Calendar;
