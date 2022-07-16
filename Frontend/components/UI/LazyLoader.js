import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/colors";

function LazyLoader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../images/loading_car.gif")}
        style={{ width: 500, height: 500 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.white,
  },
});

export default LazyLoader;
