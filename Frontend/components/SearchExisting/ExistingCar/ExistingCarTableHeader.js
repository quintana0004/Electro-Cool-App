import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors/Colors";

function ExistingCarTableHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Brand</Text>
      <Text style={styles.headerText}>Model</Text>
      <Text style={styles.headerText}>Year</Text>
      <Text style={styles.headerText}>License Plate</Text>
      <Text style={styles.headerText}>Select</Text>
    </View>
  );
}

export default ExistingCarTableHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 20,
    margin: 15,
  },
  headerText: {
    fontSize: 18,
  },
});
