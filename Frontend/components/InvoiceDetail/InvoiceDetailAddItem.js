import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";

function InvoiceDetailAddItem({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>Add Item</Text>
        <AntDesign name="pluscircle" style={styles.buttonIcon} size={24} color="white" />
      </View>
    </Pressable>
  );
}

export default InvoiceDetailAddItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    padding: 10,
    backgroundColor: Colors.black,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  buttonIcon: {
    marginLeft: 10,
  },
});
