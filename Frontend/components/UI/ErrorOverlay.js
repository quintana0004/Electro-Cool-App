import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { Button } from "react-native-paper";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/94992-error-404.gif")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.messageText}>{{ message }}</Text>
      <Button mode="contained" buttonColor={Colors.black} onPress={onConfirm}>
        Try Again
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  messageText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});

export default ErrorOverlay;
