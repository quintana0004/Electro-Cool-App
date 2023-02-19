import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ExistingCar({ route, navigation }) {
  const { client } = route.params;
  console.log("Client Data in Car Page: ", client);
  return (
    <View>
      <Text>ExistingCar</Text>
    </View>
  );
}

export default ExistingCar;
