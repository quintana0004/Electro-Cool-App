import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { Picker } from "@react-native-picker/picker";

//!TODO: Make sure to add the styles to the selection and fix the check when click on it activates the select since it is on top of it

function JobOrderItem() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.item}>
      <Text style={styles.IDText}>0001</Text>
      <Text style={styles.NameText}>Quintana Rivera, Jessica Nicole</Text>
      <Text style={styles.DateText}>11/05/2022</Text>
      <View style={styles.selector}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item style={{ fontSize: 15 }} label="New" value="New" />
          <Picker.Item
            style={{ fontSize: 15 }}
            label="Working"
            value="Working"
          />
          <Picker.Item
            style={{ fontSize: 15 }}
            label="Complete"
            value="Complete"
          />
          <Picker.Item
            style={{ fontSize: 15 }}
            label="Canceled"
            value="Canceled"
          />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  IDText: {
    fontWeight: "600",
    fontSize: 20,
    textAlignVertical: "center",
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    borderColor: "#A1A1A1",
    marginHorizontal: 10,
    marginTop: 10,
  },
  NameText: { fontWeight: "500", fontSize: 15, textAlignVertical: "center" },
  DateText: { fontWeight: "500", fontSize: 15, textAlignVertical: "center" },
  selector: {
    width: 135,
    height: 50,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
  },
});

export default JobOrderItem;
