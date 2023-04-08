import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ClientCard from "../../components/UI/ClientCard";
import CarCard from "../../components/UI/CarCard";

import Appbar from "react-native-paper/src/components/Appbar";
import Colors from "../../constants/Colors/Colors";
import {
  useCustomerInfoStore,
  useVehicleInfoStore,
} from "../../Store/JobOrderStore";

function CreateAppointments({ navigation }) {
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
  const [clientInfo] = useState(client);
  const [carInfo] = useState(car);

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("ExistingCar");
          }}
        />
        <Appbar.Content title="Appointments"></Appbar.Content>
        <Appbar.Action
          icon="check"
          iconColor={Colors.black}
          onPress={() => {}}
        />
      </Appbar.Header>
      <View style={styles.body}>
        <View style={styles.cardsContainer}>
          <View style={{ marginRight: 10 }}>
            <ClientCard client={clientInfo} />
          </View>
          <CarCard car={carInfo} />
        </View>
      </View>
    </View>
  );
}

export default CreateAppointments;

const styles = StyleSheet.create({
  body: {
    zIndex: -1,
    marginTop: 100,
  },
  header: {
    backgroundColor: Colors.yellowDark,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
