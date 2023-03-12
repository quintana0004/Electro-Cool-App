import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function InvoiceDetailSelectDeposit({ amount, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{amount}</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Select Deposit</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default InvoiceDetailSelectDeposit;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 260,
    height: 50,
    padding: 10,
    backgroundColor: Colors.selectGreen,
    borderRadius: 15,
  },
  countContainer: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});