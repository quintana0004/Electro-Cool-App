import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors/Colors";

function TableHeaderClient() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerGroupLeft}>
        <Text style={[styles.headerText, { marginLeft: 60 }]}>Client Name</Text>
      </View>

      <View style={styles.headerGroupRight}>
        <Text style={[styles.headerText, { marginRight: 80 }]}>
          Client Information
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    margin: 15,
    zIndex: -1,
  },
  headerText: {
    fontSize: 18,
  },
  headerGroupLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 2,
  },
  headerGroupRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 3,
  },
});

export default TableHeaderClient;
