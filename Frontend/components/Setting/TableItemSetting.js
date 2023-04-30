import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors/Colors";
import { useSettingStore } from "../../Store/settingStore";
import { Entypo } from "@expo/vector-icons";
import { httpUpdateUserAccessState } from "../../api/users.api";

function TableItemSetting({ data }) {
  const setUserSetting = useSettingStore((state) => state.setUserSetting);

  //Change colors of the picker
  let colorPicked;
  let colorBorder;

  const [pickedValue, setPickedValue] = useState(data.accessState);
  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );

  switch (pickedValue) {
    case "Active":
      colorPicked = Colors.lightGreen;
      colorBorder = Colors.lightGreenDark;
      break;
    case "Inactive":
      colorPicked = Colors.lightRed;
      colorBorder = Colors.lightRedDark;
      break;
  }

  async function handlePickerChange(value) {
    try {
      await httpUpdateUserAccessState(data.id, value);
      setPickedValue(value);
      toggleReloadSettingList();
    } catch (error) {
      console.log("Error at Settings Role Picker Picker Change: ", error);
    }
  }

  return (
    <View style={styles.content}>
      <View style={{ width: 130 }}>
        <Text style={styles.boldText}>
          {data.lastName}, {data.firstName}
        </Text>
      </View>
      <View style={{ width: 50 }}>
        <Text style={styles.boldText}>{data.role || "N/A"}</Text>
      </View>
      <View
        style={{
          borderRadius: 50,
          width: 150,
          backgroundColor: colorPicked,
          borderColor: colorBorder,
        }}
      >
        {(pickedValue === "Active" || pickedValue === "Inactive") && (
          <Picker
            selectedValue={pickedValue}
            onValueChange={(itemValue) => handlePickerChange(itemValue)}
            dropdownIconColor={colorBorder}
          >
            <Picker.Item
              label="Active"
              value="Active"
              style={{ color: Colors.lightGreenDark }}
            />
            <Picker.Item
              label="Inactive"
              value="Inactive"
              style={{ color: Colors.lightRedDark }}
            />
          </Picker>
        )}
        {pickedValue === "Pending" && (
          <Pressable
            style={{
              borderRadius: 51,
              width: 150,
              backgroundColor: Colors.lightBlue,
              borderColor: Colors.lightBlueDark,
              height: 52,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: Colors.lightBlueDark,
              }}
            >
              Pending
            </Text>
          </Pressable>
        )}
      </View>
      <Pressable
        style={{
          borderRadius: 50,
          marginRight: 20,
        }}
      >
        <Entypo name="trash" size={24} color="black" />
      </Pressable>
    </View>
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
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default TableItemSetting;
