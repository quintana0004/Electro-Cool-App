import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function SaveMenuBtn({ label, children, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        {children}
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
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
  },
});
