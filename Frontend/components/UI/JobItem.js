import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { Queue } from "react-native-spacing-system";
import { Picker } from "@react-native-picker/picker";

function JobItem({
  JobOrderNumber,
  LastName,
  FirstName,
  EntryDate,
  StartingStatus,
}) {
  const [status, setStatus] = useState(StartingStatus);

  // --- Verify the size of Name ---
  let sizingName = `${LastName} , ${FirstName}`;
  let space = 20;
  if (sizingName.length < 20) {
    space = 70;
  }

  // --- Change of Color Status ---
  let colorStatus;
  switch (status) {
    case "New":
      colorStatus = "#5BECE3";
      break;
    case "Complete":
      colorStatus = "#5BEC72";
      break;
    case "Working":
      colorStatus = "#ECB25B";
      break;
    case "Canceled":
      colorStatus = "#EE7E7E";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.id}>{JobOrderNumber}</Text>
      <Queue size={10} />
      <Text style={styles.name}>
        {LastName} , {FirstName}
      </Text>
      <Queue size={space} />
      <Text style={styles.date}>{EntryDate}</Text>
      <Queue size={30} />
      <View
        style={{
          minWidth: 155,
          borderWidth: 1,
          borderRadius: 25,
          backgroundColor: colorStatus,
        }}
      >
        <Picker
          mode="dropdown"
          dropdownIconColor="black"
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
        >
          <Picker.Item label="New" value="New" style={{ fontSize: 20 }} />
          <Picker.Item
            label="Complete"
            value="Complete"
            style={{ fontSize: 20 }}
          />
          <Picker.Item
            label="Working"
            value="Working"
            style={{ fontSize: 20 }}
          />
          <Picker.Item
            label="Canceled"
            value="Canceled"
            style={{ fontSize: 20 }}
          />
        </Picker>
      </View>
      <Queue size={10} />
      <Ionicons name="trash" size={50} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e7e5e4",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.hueGrey,
    elevation: 3,
    shadowRadius: 4,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowColor: Colors.blackGrey,
  },
  id: {
    fontSize: 25,
    textAlignVertical: "center",
    fontWeight: "bold",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "white",
  },
  name: {
    fontSize: 24,
    textAlignVertical: "center",
    fontWeight: "600",
  },
  date: {
    fontSize: 23,
    textAlignVertical: "center",
    fontWeight: "500",
  },
});

export default JobItem;
