import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  Pressable,
  View,
} from "react-native";
import { Appbar, Button, Checkbox, Dialog, Portal } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import {
  useCustomerInfoStore,
  useJobOrderStore,
  useRequestedServiceStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import { httpCreateJobOrderTransaction } from "../../api/jobOrders.api";

function CompanyPolicy({ navigation }) {
  // PAGE NAVIGATION FUNCTIONS
  function goHomeAction() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  function goBackAction() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  // Values needed for the alert and the checked box
  const [checked, setChecked] = useState(false);
  const [visibleErrorDialog, setVisibleErrorDialog] = useState(false);
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);

  // Values contain the result of the store for the Vehicle, client and joborder
  const [clientInfo, setClientInfo] = useState({
    id: useCustomerInfoStore((state) => state.id),
    firstName: useCustomerInfoStore((state) => state.firstName),
    lastName: useCustomerInfoStore((state) => state.lastName),
    phone: useCustomerInfoStore((state) => state.phone),
    email: useCustomerInfoStore((state) => state.email),
  });

  const [vehicleInformation, setVehicleInformation] = useState({
    id: useVehicleInfoStore((state) => state.id),
    brand: useVehicleInfoStore((state) => state.brand),
    licensePlate: useVehicleInfoStore((state) => state.licensePlate),
    model: useVehicleInfoStore((state) => state.model),
    year: useVehicleInfoStore((state) => state.year),
    mileage: useVehicleInfoStore((state) => state.mileage),
    color: useVehicleInfoStore((state) => state.color),
    vinNumber: useVehicleInfoStore((state) => state.vinNumber),
    carHasItems: useVehicleInfoStore((state) => state.carHasItems),
    carItemsDescription: useVehicleInfoStore(
      (state) => state.carItemsDescription
    ),
    customerId: useVehicleInfoStore((state) => state.customerId),
  });

  const [jobOrderInfo, setJobOrderInfo] = useState({
    id: useRequestedServiceStore((state) => state.id),
    requestedService: useRequestedServiceStore(
      (state) => state.requestedService
    ),
    serviceDetails: useRequestedServiceStore((state) => state.serviceDetails),
    status: useRequestedServiceStore((state) => state.status),
    jobLoadType: useRequestedServiceStore((state) => state.jobLoadType),
    policySignature: false,
    carId: useVehicleInfoStore((state) => state.id),
    customerId: useCustomerInfoStore((state) => state.id),
  });

  // Used to reload TableListOrder when a new job order is created or updated
  const setReloadJobOrderList = useJobOrderStore(
    (state) => state.setReloadJobOrderList
  );

  const policy = [
    {
      id: 1,
      policy:
        "The company its not responsible of the objects left in the interior of the vehicle.",
    },
    {
      id: 2,
      policy:
        "The client accepts that in case of not paying the entire invoice for the repair of the vehicle, he will leave the same in deposit in the workshop until the total payment, if this is not done before fifteen (15) working days from completion of the works. Then ten dollars ($10.00) per day will be charged for parking in our facilities. When the car has been in storage for 90 days, the company will take possession of the vehicle as payment, this text being the only notice.",
    },
    {
      id: 3,
      policy:
        "In engine repairs, the client must pay half of the total workwhen it is indicated.",
    },
  ];

  async function handleSave() {
    let customerToUpsert = {
      firstName: clientInfo.firstName,
      lastName: clientInfo.lastName,
      phone: clientInfo.phone,
      email: clientInfo.email,
    };

    if (clientInfo.id) {
      customerToUpsert.id = clientInfo.id;
    }

    let carToUpsert = {
      brand: vehicleInformation.brand,
      licensePlate: vehicleInformation.licensePlate,
      model: vehicleInformation.model,
      year: vehicleInformation.year,
      mileage: vehicleInformation.mileage,
      color: vehicleInformation.color,
      vinNumber: vehicleInformation.vinNumber,
      carHasItems: vehicleInformation.carHasItems === "Yes",
      carItemsDescription: vehicleInformation.carItemsDescription,
    };

    if (vehicleInformation.id) {
      carToUpsert.id = vehicleInformation.id;
    }

    let jobOrderToCreate = {
      requestedService: jobOrderInfo.requestedService,
      serviceDetails: jobOrderInfo.serviceDetails,
      status: "New",
      jobLoadType: jobOrderInfo.jobLoadType,
      policySignature: checked,
    };

    const response = await httpCreateJobOrderTransaction(
      customerToUpsert,
      carToUpsert,
      jobOrderToCreate
    );

    if (response.hasError) {
      setVisibleConfirmDialog(false);
      return handleErrorResponse(response.errorMessage);
    }

    showSuccessMessage();
    setReloadJobOrderList();
    setVisibleConfirmDialog(false);
    goHomeAction();
  }

  function handleErrorResponse(errorPayload) {
    if (errorPayload.errorCode === 500) {
      return Alert.alert("An Error Has Occurred.", errorPayload.errorMessage);
    }

    return Alert.alert(
      "Insufficient or Invalid Data Submission Error",
      errorPayload.errorMessage
    );
  }

  function showSuccessMessage() {
    ToastAndroid.show("Saved Successfully!", ToastAndroid.LONG);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            goBackAction();
          }}
          color="#FFFFFF"
        />
        <Appbar.Content title="Company Policy" color="#FFFFFF"></Appbar.Content>
        <Appbar.Action
          icon="check-decagram"
          onPress={() => {
            if (checked) {
              setVisibleConfirmDialog(true);
            } else {
              setVisibleErrorDialog(true);
            }
          }}
          color="#FFFFFF"
        />
      </Appbar.Header>
      <View>
        <Text style={styles.instruction}>
          Important information before signing contract
        </Text>
      </View>
      <View>
        <FlatList
          data={policy}
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 15, marginHorizontal: 30 }}>
                <Text style={{ fontSize: 20 }}>{`\u2022 ${item.policy}`}</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 30,
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          I, agree to the company policy
        </Text>
      </View>
      {visibleErrorDialog && (
        <Portal>
          <Dialog
            visible={visibleErrorDialog}
            onDismiss={() => setVisibleErrorDialog(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="alert-circle-outline"
              size={80}
              color={Colors.darkRed}
            />
            <Dialog.Title style={styles.textAlert}>Invalid Inputs</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                There are missing required or need to correct information.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Pressable onPress={() => setVisibleErrorDialog(false)}>
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Okay</Text>
                </View>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      {visibleConfirmDialog && (
        <Portal>
          <Dialog
            visible={visibleConfirmDialog}
            onDismiss={() => setVisibleConfirmDialog(false)}
            style={{ backgroundColor: Colors.white }}
          >
            <Dialog.Icon
              icon="check-circle-outline"
              size={80}
              color={Colors.darkGreen}
            />
            <Dialog.Title style={styles.textAlert}>
              Confirm Job Order
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textAlert}>
                Is this the final statement of the Job Order?
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-between" }}>
              <Pressable
                onPress={async () => {
                  await handleSave();
                }}
              >
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Confirm</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setVisibleConfirmDialog(false)}>
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>Cancel</Text>
                </View>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  instruction: {
    fontWeight: "800",
    color: Colors.black,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  containerKey: {
    flex: 1,
  },
  navBtnsPosition: {
    width: 540,
    height: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navCancelBtn: { marginRight: 10 },
  navNextBtn: { marginLeft: 10 },
  header: {
    backgroundColor: Colors.darkBlack,
  },
  textAlert: {
    textAlign: "center",
  },
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

export default CompanyPolicy;
