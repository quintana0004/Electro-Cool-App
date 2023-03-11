import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function SaveMenuBtn({ label, icon, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Image style={styles.buttonIcon} source={icon} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default SaveMenuBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    width: 110,
    height: 55,
    marginBottom: 10,
  },
  buttonIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
