import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";

function InvoiceDetailTableHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerGroupLeft}>
        <Text style={styles.headerText}>Description</Text>
      </View>
      <View style={styles.headerGroupRight}>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
    </View>
  );
}

export default InvoiceDetailTableHeader;

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
