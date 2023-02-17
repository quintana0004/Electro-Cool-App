import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";

function ClientSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Header divideH={8} divideW={1.1} colorHeader={Colors.yellowDark}>
        <Text style={styles.title}>Select client for Job Order</Text>
      </Header>
      <View style={styles.body}>
        <Text>ClientSelection</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    zIndex: -1,
  },
});

export default ClientSelection;
