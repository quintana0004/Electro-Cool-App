import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { Button } from "react-native-paper";

function DashboardErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/94992-error-404.gif")}
        style={{ width: 110, height: 100 }}
      />
      <Text style={styles.messageText}>{message}</Text>
      <Button
        mode="elevated"
        buttonColor={Colors.black}
        onPress={onConfirm}
        labelStyle={{
          fontSize: 11,
          color: "white",
          marginLeft: 13,
          marginRight: 13,
        }}
        compact={true}
      >
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
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default DashboardErrorOverlay;
