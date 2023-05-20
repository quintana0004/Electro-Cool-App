import React, { useState } from "react";
import { StyleSheet, View, Text, ToastAndroid, Pressable } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import ModalDropdown from "react-native-modal-dropdown";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { httpUpsertUsers } from "../../api/users.api";
import ErrorDialog from "../UI/ErrorDialog";
import { useSettingStore } from "../../Store/settingStore";

function ModalPicker({ visible, setVisible, firstName, lastName, ID }) {
  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );
  const [pickedRole, setPickedRole] = useState(0);
  const [errorMSG, setErrorMSG] = useState("");
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [dateSelected, setDateSelected] = useState("");
  const [dateSelectedFirst, setDateSelectedFirst] = useState("");
  const [dateSelectedSecond, setDateSelectedSecond] = useState("");
  const [counter, setCounter] = useState(0);
  const todaysDate = new Date();
  const minDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth(),
    todaysDate.getDate()
  );
  const minDate1 = minDate.toISOString();

  function dateSelectedUser(date) {
    let count = counter + 1;

    if (count === 1) {
      setCounter(count);
      setDateSelectedFirst(date);
    } else if (count === 2) {
      setCounter(count);
      setDateSelectedSecond(date);
    } else {
      setCounter(0);
    }
  }

  //Will indicate on the server the type of role being assigned
  async function assignRoleUser() {
    let dataUser;

    if (pickedRole === 0) {
      setErrorMSG("Must select between admin or temporary admin.");
      setErrorDialogVisible(true);
      return;
    }

    // This is the admin pick
    if (pickedRole === 1) {
      dataUser = {
        userId: ID,
        role: "Admin",
        accessState: "Active",
      };
    }

    // This is the Temp. Admin
    if (pickedRole === 2) {
      dataUser = {
        userId: ID,
        role: "Temp. Admin",
        accessState: "Inactive",
        startDate: new Date(dateSelectedFirst),
        endDate: new Date(dateSelectedSecond),
      };
    }

    console.log("USER DATA: ", dataUser);
    const response = await httpUpsertUsers(dataUser);

    if (response.hasError) {
      setErrorMSG(response.errorMessage);
      setErrorDialogVisible(true);
      return;
    }
    setVisible(false);
    toggleReloadSettingList();
    showSuccessMessage();
  }

  //Toast Message
  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: Colors.white }}
        >
          <View
            style={{
              backgroundColor: Colors.lightGreenMoney,
              marginHorizontal: 20,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 20,
                marginBottom: 15,
              }}
            >
              Choose a role for {firstName} {lastName}
            </Text>
            <View style={{ width: 200, marginLeft: 130 }}>
              <ModalDropdown
                options={["Option", "Admin", "Temporary Admin"]}
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  padding: 5,
                }}
                textStyle={{ fontSize: 20 }}
                onSelect={(value) => {
                  setPickedRole(value);
                  setCounter(0);
                  setDateSelectedFirst("");
                  setDateSelectedSecond("");
                }}
                dropdownTextStyle={{ fontSize: 20 }}
              />
            </View>
            {pickedRole === 1 && (
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 2,
                  borderColor: "#939393",
                  borderRadius: 10,
                  paddingHorizontal: 50,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    marginVertical: 5,
                    marginTop: 10,
                  }}
                >
                  Full access to delete, create and edit the following:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    paddingHorizontal: 50,
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Dashboard
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Invoices
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Client Book
                    </Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Job Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Calendar
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Setting
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {pickedRole === 2 && (
              <View>
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderWidth: 2,
                    borderColor: "#939393",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    paddingHorizontal: 50,
                    marginTop: 20,
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Only access to create and edit the following:
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Dashboard - Job Order Info on analytics
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Job Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Invoices
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Calendar
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}
                    >
                      Setting - Personal Profile Access
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                  <Calendar
                    onDayPress={(day) => {
                      dateSelectedUser(day.dateString);
                    }}
                    minDate={minDate1}
                    markingType={"period"}
                    disableArrowLeft={true}
                    markedDates={{
                      [dateSelectedFirst]: {
                        color: Colors.darkGreen,
                        selected: true,
                        startingDay: true,
                        endingDay: true,
                      },
                      [dateSelectedSecond]: {
                        selected: true,
                        startingDay: true,
                        endingDay: true,
                        color: Colors.darkRed,
                      },
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          <Dialog.Actions>
            {pickedRole === 2 && (
              <Pressable
                onPress={() => {
                  setCounter(0);
                  setDateSelectedFirst("");
                  setDateSelectedSecond("");
                }}
              >
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Refresh</Text>
                </View>
              </Pressable>
            )}
            <Pressable onPress={() => setVisible(false)}>
              <View style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Cancel</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={async () => {
                await assignRoleUser();
              }}
            >
              <View style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Submit</Text>
              </View>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ErrorDialog
        dialogVisible={errorDialogVisible}
        setDialogVisible={setErrorDialogVisible}
        errorMSG={errorMSG}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  confirmBtn: {
    height: 50,
    width: 150,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.brightGreen,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 20,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ModalPicker;
