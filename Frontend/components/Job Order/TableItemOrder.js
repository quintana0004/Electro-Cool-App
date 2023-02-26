import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors/Colors";

function TableItemOrder({ ID, firstName, lastName, date, status }) {
  let colorPicked;
  let colorBorder;
  const [pickedValue, setPickedValue] = useState(status.toString());

  switch (pickedValue) {
    case "New":
      colorPicked = Colors.lightBlue;
      colorBorder = Colors.lightBlueDark;
      break;
    case "Complete":
      colorPicked = Colors.lightGreen;
      colorBorder = Colors.lightGreenDark;
      break;
    case "Working":
      colorPicked = Colors.lightOrange;
      colorBorder = Colors.lightOrangeDark;
      break;
    case "Canceled":
      colorPicked = Colors.lightRed;
      colorBorder = Colors.lightRedDark;
      break;
  }

  return (
    <Pressable>
      <View style={styles.content}>
        <View style={{ width: 50, marginLeft: 15 }}>
          <Text style={styles.boldText}>{ID}</Text>
        </View>
        <View style={{ width: 250 }}>
          <Text style={styles.boldText}>
            {lastName}, {firstName}
          </Text>
        </View>
        <View style={{ width: 100 }}>
          <Text style={styles.boldText}>{date}</Text>
        </View>
        <View
          style={{
            borderWidth: 0.2,
            borderRadius: 50,
            width: 150,
            backgroundColor: colorPicked,
            borderColor: colorBorder,
          }}
        >
          <Picker
            selectedValue={pickedValue}
            onValueChange={(itemValue, itemIndex) => setPickedValue(itemValue)}
          >
            <Picker.Item label="New" value="New" />
            <Picker.Item label="Working" value="Working" />
            <Picker.Item label="Complete" value="Complete" />
            <Picker.Item label="Canceled" value="Canceled" />
          </Picker>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default TableItemOrder;
