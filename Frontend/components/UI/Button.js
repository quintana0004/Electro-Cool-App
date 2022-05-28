import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, handler }) {
  // Image
  const image = require("./../../images/BtnJobOrderMain.png");

  return (
    <TouchableOpacity onPress={handler} activeOpacity={0.3}>
      <View style={styles.btn}>
        <Text style={styles.txt}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 300,
    height: 100,
    backgroundColor: Colors.yellow,
    padding: 30,
    margin: 20,
    borderRadius: 30,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  txt: {
    fontSize: 25,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default Button;
