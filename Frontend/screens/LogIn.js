import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function LogIn({ navigation }) {
  return (
    <View style={style.container}>
      <Text>LogIn Page In Work</Text>
      <Button
        onPress={() => navigation.navigate("Dashboard")}
        title="HEAD TO DASHBOARD"
      ></Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
export default LogIn;
