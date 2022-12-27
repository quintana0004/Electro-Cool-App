import { Text, View, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Colors from "../../constants/Colors/Colors";

function ActionBtn({ children, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.yellowDark,
    width: 180,
    height: 65,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default ActionBtn;
