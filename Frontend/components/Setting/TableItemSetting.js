import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors/Colors";
import { useSettingStore } from "../../Store/settingStore";
import { Entypo } from "@expo/vector-icons";
import { httpDeleteUser, httpUpdateUserAccessState } from "../../api/users.api";
import ErrorDialog from "../UI/ErrorDialog";

//Modals
import ModalPicker from "./modalPicker";

function TableItemSetting({ data }) {
  const setUserSetting = useSettingStore((state) => state.setUserSetting);
  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );

  const [pickedValue, setPickedValue] = useState(data.accessState);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const [visibilityPendingUser, setVisibilityPendingUser] = useState(false);

  //Change colors of the picker
  let colorPicked;
  let colorBorder;
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

  async function handleUserDeletion() {
    const response = await httpDeleteUser(data.id);

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
    }

    toggleReloadSettingList();
  }

  return (
    <View>
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
            <View style={{ paddingLeft: 20 }}>
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
            </View>
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
              onPress={() => setVisibilityPendingUser(true)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: 25,
                  color: Colors.lightBlueDark,
                }}
              >
                Pending
              </Text>
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={handleUserDeletion}
          style={{
            borderRadius: 50,
            marginRight: 20,
          }}
        >
          <Entypo name="trash" size={24} color="black" />
        </Pressable>

        <ErrorDialog
          dialogVisible={errorDialogVisible}
          setDialogVisible={setErrorDialogVisible}
          errorMSG={errorMSG}
        />
      </View>
      <ModalPicker
        visible={visibilityPendingUser}
        setVisible={setVisibilityPendingUser}
        firstName={data.firstName}
        lastName={data.lastName}
        ID={data.id}
      />
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
