import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { Appbar } from "react-native-paper";

import { httpGetDeposit, httpUpsertDeposit } from "../../api/deposits.api";

import Colors from "../../constants/Colors/Colors";
import CarCard from "../../components/UI/CarCard";
import ClientCard from "../../components/UI/ClientCard";
import NavBtn from "../../components/UI/NavBtns";
import SectionDivider from "../../components/UI/SectionDivider";
import AmountInput from "../../components/UI/AmountInput";
import SaveMenu from "../../components/UI/SaveMenu";
import { useDepositStore } from "../../Store/depositStore";
import { useCustomerInfoStore, useVehicleInfoStore } from "../../Store/store";
import { StackActions } from "@react-navigation/native";

function DepositDetail({ route, navigation }) {
  const { depositId = null } = route.params || {};

  // Store Variables
  const client = useCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      addressLine1: state.addressLine1,
      addressLine2: state.addressLine2,
      state: state.state,
      city: state.city,
      phone: state.phone,
      email: state.email,
    };
  });
  const car = useVehicleInfoStore((state) => {
    return {
      id: state.id,
      brand: state.brand,
      licensePlate: state.licensePlate,
      model: state.model,
      year: state.year,
      mileage: state.mileage,
      color: state.color,
      vinNumber: state.vinNumber,
      carHasItems: state.carHasItems,
      carItemsDescription: state.carItemsDescription,
      customerId: state.customerId,
    };
  });
  const toggleReloadDepositList = useDepositStore((state) => state.toggleReloadDepositList);

  // Store Variables
  const [clientInfo, setClientInfo] = useState(client);
  const [carInfo, setCarInfo] = useState(car);
  const [depositDescription, setDepositDescription] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const isDepositRevocable = !!depositId;
  
  const { isLoading, isError, error } = useQuery({
    queryKey: ["DepositDetailData", depositId],
    queryFn: fetchDepositData,
    enabled: !!depositId,
  });

  function navigateNext() {}

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateCancel() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  function setDepositInfo(data) {
    setClientInfo(data.customer);
    setCarInfo(data.car);
    setDepositDescription(data.description);
    setDepositAmount(data.amountTotal);
  }

  async function fetchDepositData() {
    const response = await httpGetDeposit(depositId);
    setDepositInfo(response.data);
    return response.data;
  }

  async function onSaveUpdateDeposit(option) {
    const depositInfo = {
      customerId: clientInfo.id,
      carId: carInfo.id,
      description: depositDescription,
      amountTotal: depositAmount,
      status: option,
    };

    // Only assign the depositId if it exists. If it doesn't exist, then we are creating a new deposit.
    if (depositId) depositInfo.id = depositId;

    const response = await httpUpsertDeposit(depositInfo);
    if (response.hasError) {
      return Alert.alert("Error", "There was an error saving the deposit. Please try again later.");
    }

    onSaveNavigation(option);
  }

  function onSaveNavigation(option) {
    
    Alert.alert("Success", "The deposit was saved successfully.");
    toggleReloadDepositList();

    if (option === "Pay") {
      return console.log("Pay Button Clicked");
    }

    return navigation.navigate("InvoiceMain");
  }

  if (isError) {
    console.log("Error Fetching Deposit Detail: ", error);
    Alert.alert("Error", "There was an error fetching the deposit detail data. Please try again later.");
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title="Deposit"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.body}>
        {(isLoading && !!depositId) || (
          <View style={{ height: 600 }}>
            <View style={styles.cardsContainer}>
              <View style={{ marginRight: 10 }}>
                <ClientCard client={clientInfo} />
              </View>
              <CarCard car={carInfo} />
            </View>

            <SectionDivider
              containerStyles={{ justifyContent: "center" }}
              title={"Deposit Description"}
            />

            <TextInput
              style={styles.textInput}
              value={depositDescription}
              mode="outlined"
              multiline
              numberOfLines={8}
              onChangeText={setDepositDescription}
            />

            <SectionDivider title={"Deposit Amount"} />

            <AmountInput value={depositAmount} onChange={setDepositAmount} />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.navBtnGroup}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navigateBack} />
          </View>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navigateCancel} />
          </View>
          <SaveMenu onSelection={onSaveUpdateDeposit} isRevokeActive={isDepositRevocable} />
        </View>
      </View>
    </View>
  );
}

export default DepositDetail;

const styles = StyleSheet.create({
  body: {
    marginTop: 40,
    height: 670,
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.lightGreenHeader,
  },
  textInput: {
    textAlignVertical: "top",
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  navBtnGroup: {
    width: 540,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navBackBtn: {
    marginRight: 130,
  },
  navCancelBtn: {
    marginRight: 10,
  },
  navNextBtn: {
    marginLeft: 10,
  },
});
