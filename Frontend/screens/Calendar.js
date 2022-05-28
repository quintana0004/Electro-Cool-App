import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

function Calendar() {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
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
});

export default Calendar;
