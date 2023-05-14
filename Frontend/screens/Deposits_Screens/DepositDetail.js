import { useState } from "react";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
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
import {
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import PaymentConfirmationDialog from "../../components/UI/PaymentConfirmationDialog";

function DepositDetail({ route, navigation }) {
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
  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );
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
  const setVehicleInformation = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );
  const depositId = useDepositStore((state) => state.id);
  const setDeposit = useDepositStore((state) => state.setDeposit);
  const toggleReloadDepositList = useDepositStore(
    (state) => state.toggleReloadDepositList
  );

  // State Variables
  const [clientInfo, setClientInfo] = useState(client);
  const [carInfo, setCarInfo] = useState(car);
  const [depositDescription, setDepositDescription] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositStatus, setDepositStatus] = useState("");
  const [isDepositEditable, setIsDepositEditable] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["DepositDetailData", depositId],
    queryFn: fetchDepositData,
    enabled: !!depositId,
  });

  function setStoreInformation() {
    setCustomerInfo(
      clientInfo.id,
      clientInfo.firstName,
      clientInfo.lastName,
      clientInfo.phone,
      clientInfo.email
    );

    setVehicleInformation(
      carInfo.id,
      carInfo.brand,
      carInfo.licensePlate,
      carInfo.model,
      carInfo.year,
      carInfo.mileage,
      carInfo.color,
      carInfo.vinNumber,
      carInfo.carHasItems,
      carInfo.carItemsDescription,
      carInfo.customerId
    );
  }

  function navigateToPayment() {
    setStoreInformation();
    const pageAction = StackActions.push("DepositPayment");
    navigation.dispatch(pageAction);
  }

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
    setDepositStatus(data.status);
    setIsDepositEditable(data.status !== "Paid");
  }

  async function fetchDepositData() {
    const response = await httpGetDeposit(depositId);
    setDepositInfo(response.data);
    return response.data;
  }

  async function onSaveUpdateDeposit(option) {
    if (option === "Paid") {
      return setIsDialogVisible(true);
    }
    if (option === "PDF") {
      setDeposit(depositId, depositDescription, depositAmount, "");
      return navigateToPayment();
    }

    // Save Deposit if payment was not selected
    await saveDeposit(option);
    setDepositStatus(option);

    // After Save refresh deposit list and return to main page
    toggleReloadDepositList();
    showSuccessMessage();

    return navigation.navigate("InvoiceMain");
  }

  async function saveDeposit(status) {
    const depositInfo = {
      customerId: clientInfo.id,
      carId: carInfo.id,
      description: depositDescription,
      amountTotal: depositAmount,
      status: status,
    };

    // Only assign the depositId if it exists. If it doesn't exist, then we are creating a new deposit.
    if (depositId) depositInfo.id = depositId;

    const response = await httpUpsertDeposit(depositInfo);
    if (response.hasError) {
      console.log("Error message on upsert deposit: ", response.errorMessage);
      return Alert.alert(
        "Error",
        "There was an error saving the deposit. Please try again later."
      );
    }

    storeDepositOnSave(response.data);
  }

  async function handleDepositPayment() {
    await saveDeposit("Paid");
    setDepositStatus("Paid");
    setIsDepositEditable(false);

    // Refresh Deposit List and Navigate to Payment
    toggleReloadDepositList();
    showSuccessMessage();
    setIsDialogVisible(false);

    return navigateToPayment();
  }

  function storeDepositOnSave(deposit) {
    setDeposit(
      deposit.id,
      deposit.description,
      deposit.amountTotal,
      deposit.createdDate
    );
  }

  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
  }

  if (isError) {
    console.log("Error Fetching Deposit Detail: ", error);
    Alert.alert(
      "Error",
      "There was an error fetching the deposit detail data. Please try again later."
    );
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
              editable={isDepositEditable}
            />

            <SectionDivider title={"Deposit Amount"} />

            <AmountInput
              value={depositAmount}
              onChange={setDepositAmount}
              isEditable={isDepositEditable}
            />
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
          <SaveMenu
            onSelection={onSaveUpdateDeposit}
            activeState={depositStatus}
          />
        </View>
      </View>

      {/* Dialogs */}
      {isDialogVisible && (
        <PaymentConfirmationDialog
          title={"Realize Deposit Payment"}
          body={
            "Once a payment is made, this deposit cannot be modified again."
          }
          isDialogVisible={isDialogVisible}
          setIsDialogVisible={setIsDialogVisible}
          onCancel={() => setIsDialogVisible(false)}
          onConfirm={handleDepositPayment}
        />
      )}
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
