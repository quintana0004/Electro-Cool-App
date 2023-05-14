import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors/Colors";
import { format } from "date-fns";
import { httpUpdateStatusJobOrder } from "../../api/jobOrders.api";
import {
  useJobOrderStore,
  useCustomerInfoStore,
  useRequestedServiceStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

function TableItemOrder({
  ID,
  firstName,
  lastName,
  date,
  status,
  carId,
  customerId,
  requestedId,
}) {
  //Change colors of the picker
  let colorPicked;
  let colorBorder;

  const [pickedValue, setPickedValue] = useState(status.toString());
  const setReloadJobOrderList = useJobOrderStore(
    (state) => state.setReloadJobOrderList
  );

  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );
  const setVehicleInformation = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );
  const setRequestedService = useRequestedServiceStore(
    (state) => state.setRequestedService
  );

  const setJobOrder = useJobOrderStore((state) => state.setJobOrder);
  const navigation = useNavigation();
  const pageAction = StackActions.push("ClientInformation");

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

  async function handlePickerChange(value) {
    try {
      await httpUpdateStatusJobOrder(ID, value);
      setPickedValue(value);
      setReloadJobOrderList();
    } catch (error) {
      console.log("Error at Job Order Picker Change: ", error);
    }
  }

  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  return (
    <View style={styles.content}>
      <Pressable
        style={{ flexDirection: "row" }}
        onPress={() => {
          navigation.dispatch(pageAction);
          setJobOrder("Edit", true, true, true);
          setCustomerInfo(customerId, "", "", "", "");
          setVehicleInformation(carId, "", "", "", "", "", "", "", "", "", "");
          setRequestedService(ID, "", "", "", "", "", "", "");
        }}
      >
        <View style={{ width: 50, marginLeft: 15 }}>
          <Text style={styles.boldText}>{`000` + ID}</Text>
        </View>
        <View style={{ width: 250 }}>
          <Text style={styles.boldText}>
            {lastName}, {firstName}
          </Text>
        </View>
        <View style={{ width: 100 }}>
          <Text style={styles.boldText}>{DateText()}</Text>
        </View>
      </Pressable>
      <View
        style={{
          borderWidth: 0.7,
          borderRadius: 50,
          width: 150,
          backgroundColor: colorPicked,
          borderColor: colorBorder,
        }}
      >
        <Picker
          selectedValue={pickedValue}
          onValueChange={(itemValue) => handlePickerChange(itemValue)}
          dropdownIconColor={colorBorder}
        >
          <Picker.Item
            label="New"
            value="New"
            style={{ color: Colors.lightBlueDark }}
          />
          <Picker.Item
            label="Working"
            value="Working"
            style={{ color: Colors.lightOrangeDark }}
          />
          <Picker.Item
            label="Complete"
            value="Complete"
            style={{ color: Colors.lightGreenDark }}
          />
          <Picker.Item
            label="Canceled"
            value="Canceled"
            style={{ color: Colors.lightRedDark }}
          />
        </Picker>
      </View>
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

export default TableItemOrder;
