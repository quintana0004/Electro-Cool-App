import React, { useState } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { httpUpsertUsers } from "../../api/users.api";
import ErrorDialog from "../UI/ErrorDialog";
import { useSettingStore } from "../../Store/settingStore";

function ModalConfirmTemp({
  firstName,
  lastName,
  ID,
  username,
  phoneNumber,
  email,
  role,
  visible,
  setVisible,
}) {
  const toggleReloadSettingList = useSettingStore(
    (state) => state.toggleReloadSettingList
  );

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

    dataUser = {
      userId: ID,
      role: "Temp. Admin",
      accessState: "Inactive",
      startDate: new Date(dateSelectedFirst),
      endDate: new Date(dateSelectedSecond),
    };

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
              Activate Temporary Administrator
            </Text>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
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
                    Username: {username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Name: {lastName}, {firstName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Phone Number: {phoneNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginVertical: 5,
                    }}
                  >
                    Email: {email}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                marginVertical: 5,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Select time period for the temporary administrator being an active
              user.
            </Text>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
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

          <Dialog.Actions>
            <Button
              textColor={Colors.darkGreen}
              onPress={() => {
                setCounter(0);
                setDateSelectedFirst("");
                setDateSelectedSecond("");
              }}
            >
              Refresh Data
            </Button>

            <Button
              textColor={Colors.darkGreen}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>

            <Button textColor={Colors.darkGreen} onPress={assignRoleUser}>
              Submit
            </Button>
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

export default ModalConfirmTemp;
