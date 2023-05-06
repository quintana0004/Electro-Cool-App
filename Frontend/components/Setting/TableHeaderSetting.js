import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function TableHeaderSetting() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerGroupLeft}>
        <Text style={[styles.headerText, { marginLeft: 10 }]}>Name</Text>
        <Text style={[styles.headerText, { marginLeft: 120 }]}>Role</Text>
      </View>

      <View style={styles.headerGroupRight}>
        <Text style={[styles.headerText, { marginLeft: 120 }]}>Status</Text>
        <Text style={[styles.headerText, { marginLeft: 60 }]}>Delete</Text>
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
    flex: 1,
  },
  headerGroupRight: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 2,
  },
});

export default TableHeaderSetting;
