import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import NavBtn from "../../components/UI/NavBtns";

function ClientSelection({ navigation }) {
  function navNext() {
    if (toggleNewCustomer) navigation.navigate("ClientInformation");
    else if (toggleExistingCustomer) navigation.navigate("ExistingClient");
  }
  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  const [toggleNewCustomer, setToggleNewCustomer] = useState(false);
  const [toggleExistingCustomer, setToggleExistingCustomer] = useState(false);

  let NewCustomerIcon = require("../../assets/images/NewCustomerIcon.png");
  let NewCustomerSelectedIcon = require("../../assets/images/NewCustomerSelectedIcon.png");
  let ExistingCustomerIcon = require("../../assets/images/ExistingCustomerIcon.png");
  let ExistingCustomerSelectedIcon = require("../../assets/images/ExistingCustomerSelectedIcon.png");

  function NewCustomer() {
    if (toggleNewCustomer === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            style={styles.NewCustomerIconStyle}
            source={NewCustomerSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            New Customer
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image style={styles.NewCustomerIconStyle} source={NewCustomerIcon} />
          <Text style={styles.ButtonText}>New Customer</Text>
        </View>
      );
    }
  }

  function ExistingCustomer(toggleBtn2) {
    if (toggleBtn2 === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            style={styles.ExistingCustomerIconStyle}
            source={ExistingCustomerSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            Existing Customer
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image
            style={styles.ExistingCustomerIconStyle}
            source={ExistingCustomerIcon}
          />
          <Text style={styles.ButtonText}>Existing Customer</Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Header divideH={8} divideW={1.1} colorHeader={Colors.yellowDark}>
        <View style={styles.HeaderContent}>
          <Text style={styles.title}>Select customer for Job Order</Text>
        </View>
      </Header>

      <View style={styles.Container}>
        <View>
          <Pressable
            onPress={() => [
              NewCustomer(),
              setToggleNewCustomer(!toggleNewCustomer),
              setToggleExistingCustomer(false),
            ]}
          >
            <View>{NewCustomer(toggleNewCustomer)}</View>
          </Pressable>
          <Pressable
            onPress={() => [
              ExistingCustomer(),
              setToggleExistingCustomer(!toggleExistingCustomer),
              setToggleNewCustomer(false),
            ]}
          >
            <View>{ExistingCustomer(toggleExistingCustomer)}</View>
          </Pressable>
        </View>

        <View style={styles.navBtnsPosition}>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navJobOrder} />
          </View>
          <View style={styles.navNextBtn}>
            <NavBtn choice={"Next"} nav={navNext} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  Container: {
    alignItems: "center",
    margin: 130,
  },
  Button: {
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 30,
    width: 350,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  ButtonPressed: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.black,
    backgroundColor: Colors.black,
    borderWidth: 4,
    borderRadius: 30,
    width: 350,
    height: 280,
    margin: 10,
  },
  ButtonText: { fontSize: 35 },
  NewCustomerIconStyle: {
    width: 100,
    height: 130,
    marginBottom: 20,
  },
  ExistingCustomerIconStyle: {
    width: 143,
    height: 106,
    marginBottom: 30,
  },
  naviBtnsPosition: {
    width: 540,
    height: 150,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navCancelBtn: { marginRight: 10 },
  navNextBtn: { marginLeft: 10 },
});

export default ClientSelection;
