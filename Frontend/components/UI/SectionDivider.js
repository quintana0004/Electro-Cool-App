import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function SectionDivider({ title, containerStyles, titleStyles }) {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
    </View>
  );
}

export default SectionDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
});
