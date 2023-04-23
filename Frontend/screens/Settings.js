import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/UI/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";

function Setting({ navigation }) {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <Appbar.Content></Appbar.Content>
      </Appbar.Header>
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default Setting;
