import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import {
  useCustomerInfoStore,
  useRequestedServiceStore,
  useVehicleInfoStore,
  useJobOrderStore,
} from "../../Store/JobOrderStore";
import { Checkbox } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";

function CompanyPolicy({ navigation }) {
  //funtion for the page navigation
  //? home
  function goHomeAction() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  //? go back
  function goBackAction() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  //Values needed for the alert and the checked box
  const [checked, setChecked] = useState("");
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
    policySignature: useRequestedServiceStore((state) => state.policySignature),
    carId: useRequestedServiceStore((state) => state.carId),
    customerId: useRequestedServiceStore((state) => state.customerId),
  });

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

  async function handleSaveClient(clientInfo) {
    try {
      console.log("Client Info: ", clientInfo);
      const response = await httpUpsertClient(clientData);
      console.log("Client Saved Data: ", response.data);
    } catch (error) {
      console.log("Error at Handle Save Client: ", error);
    }
  }

  async function handleSaveCar(carInfo) {
    try {
      console.log("Car Info: ", carInfo);
      const response = await httpUpsertCar(carData);
      console.log("Car Saved Data: ", response.data);
    } catch (error) {
      console.log("Error at Handle Save Car: ", error);
    }
  }

  async function handleSaveJobOrder(clientId, carId, jobOrderInfo) {
    try {
      const response = await httpUpsertJobOrder(jobOrderData);
      console.log("Job Order Saved Data: ", response.data);
    } catch (error) {
      console.log("Error at Handle Save Job Order: ", error);
    }
  }

  // The client, car and job order info could also be variables in Use State not only parameters
  async function handleSave(clientInfo, carInfo, jobOrderItemInfo) {
    try {
      // Handle all API calls here
      if (!clientInfo.id) {
        clientInfo = await handleSaveClient(clientInfo);
      }

      if (!carInfo.id) {
        carInfo = await handleSaveCar(carInfo);
      }

      const response = await handleSaveJobOrder(
        clientInfo.id,
        carInfo.id,
        jobOrderItemInfo
      );

      console.log("Hanlde All Save Response: ", response);
    } catch (error) {
      console.log("Error at Handle Save: ", error);
    }
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
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setVisibleErrorDialog(false)}
              >
                Okay
              </Button>
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
            <Dialog.Actions>
              <Button
                textColor={Colors.darkGreen}
                onPress={() => {
                  setVisibleConfirmDialog(false);
                }}
              >
                Confirm
              </Button>
              <Button
                textColor={Colors.yellowDark}
                onPress={() => setVisibleConfirmDialog(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGreen,
  },
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
});

export default CompanyPolicy;
