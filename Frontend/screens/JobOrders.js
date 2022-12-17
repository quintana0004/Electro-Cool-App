import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";

function JobOrders({ navigation }) {
  //Function of the btns
  function navSelectClient() {
    navigation.navigate("CustomerSelection");
  }

  function navSelectCar() {
    navigation.navigate("CarSelection");
  }

  function navClientInformation() {
    navigation.navigate("ClientInformation");
  }

  function navCompanyPolicy() {
    navigation.navigate("CompanyPolicy");
  }

  return (
    <View style={styles.container}>
      <Header divideH={8} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <Text>JobOrder Screen!</Text>
        <Button title="Gabbox01" onPress={() => navSelectClient()} />
        <Button title="Gabbox02" onPress={() => navSelectCar()} />
        <Button title="Shelly01" onPress={() => navClientInformation()} />
        <Button title="Shelly02" onPress={() => navCompanyPolicy()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    zIndex: -1,
  },
  btn: {
    marginVertical: 20,
  },
});

export default JobOrders;
