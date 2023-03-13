import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import {
  useCustomerInfoStore,
  useRequestedServiceStore,
  useVehicleInfoStore,
  useJobOrderStore,
} from "../../Store/store";
import { Checkbox } from "react-native-paper";

function CompanyPolicy({ navigation }) {
  const [checked, setChecked] = useState("");

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

  function navNext() {
    navigation.navigate("CompanyPolicy");
  }

  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  async function handleSaveClient(clientInfo) {
    try {
      console.log("Client Info: ", clientInfo);

      // If you do not include an Id in the clientData object, it will create a new customer
      let clientData = {
        id: clientInfo.id, // String or Number - Only send this Id, if you are updating an existing customer
        firstName: clientInfo.firstName, // String
        lastName: clientInfo.lastName, // String
        addressLine1: clientInfo.addressLine1, // String
        addressLine2: clientInfo.addressLine2, // String - Optional
        state: clientInfo.state, // String - Optional
        city: clientInfo.city, // String
        phone: clientInfo.phone, // String
        email: clientInfo.email, // Optional
      };

      const response = await httpUpsertClient(clientData);
      console.log("Client Saved Data: ", response.data);
    } catch (error) {
      console.log("Error at Handle Save Client: ", error);
    }
  }

  async function handleSaveCar(carInfo) {
    try {
      console.log("Car Info: ", carInfo);

      // If you do not include an Id in the carData object, it will create a new car
      let carData = {
        id: carInfo.id, // String or Number - Only send this Id, if you are updating an existing car
        brand: carInfo.brand, // String
        licensePlate: carInfo.licensePlate, // String
        model: carInfo.model, // String
        year: carInfo.year, // String
        mileage: carInfo.mileage, // String
        color: carInfo.color, // String
        vinNumber: carInfo.vinNumber, // String
        carHasItems: carInfo.carHasItems, // Boolean - Optional
        carItemsDescription: carInfo.carItemsDescription, // String - Optional
        customerId: carInfo.customerId, // String or Number
      };

      const response = await httpUpsertCar(carData);
      console.log("Car Saved Data: ", response.data);
    } catch (error) {
      console.log("Error at Handle Save Car: ", error);
    }
  }

  async function handleSaveJobOrder(clientId, carId, jobOrderInfo) {
    try {
      console.log("Job Order: ", jobOrder);

      // If you do not include an Id in the jobOrderData object, it will create a new job order
      let jobOrderData = {
        id: jobOrderInfo.id, // Only send this Id, if you are updating an existing job order
        requestedService: jobOrderInfo.requestedService, // "Oil Change;Tune Up;Motor"
        serviceDetails: jobOrderInfo.serviceDetails, // String
        status: jobOrderInfo.status, // String
        jobLoadType: jobOrderInfo.jobLoadType, // String
        policySignature: jobOrderInfo.policySignature, // Boolean
        carId: carId, // String o Number
        customerId: clientId, // String o Number
      };

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
            navigation.goBack();
          }}
          color="#FFFFFF"
        />
        <Appbar.Content title="Company Policy" color="#FFFFFF"></Appbar.Content>
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
});

export default CompanyPolicy;
