import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../../constants/colors";
import { Button } from "native-base";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../images/95614-error-occurred.gif")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>An error occured!</Text>
      </View>
      <View>
        <Text style={styles.message}>{message}</Text>
        <Button
          borderRadius="30"
          variant="solid"
          _text={{ fontSize: 30, fontWeight: "medium" }}
          bgColor="light.800"
          onPress={onConfirm}
        >
          Try Again
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25,
  },
  message: { fontSize: 20, fontWeight: "500", marginTop: 20, marginBottom: 30 },
});

export default ErrorOverlay;
