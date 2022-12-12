import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";

// import NavBtn from "../../components/UI/NavBtns";

function ClientSelection({ navigation }) {
  // function navNext() {
  //   if (toggleNewCustomer) navigation.navigate("ClientInformation");
  //   else if (toggleExistingCustomer) navigation.navigate("ExistingClient");
  // }
  // function navJobOrder() {
  //   navigation.navigate("JobOrderMain");
  // }

  const [toggleNewCustomer, setToggleNewCustomer] = useState(false);
  const [toggleExistingCustomer, setToggleExistingCustomer] = useState(false);

  let NewCustomerIcon = require("../../assets/images/NewCustomerIcon.png");
  let NewCustomerSelectedIcon = require("../../assets/images/NewCustomerSelectedIcon.png");
  let ExistingCustomerIcon = require("../../assets/images/ExistingCustomerIcon.png");
  let ExistingCustomerSelectedIcon = require("../../assets/images/ExistingCustomerSelectedIcon.png");

  function NewCustomer() {
    if (toggleNewCustomer === true) {
      return (
        <View style={[styles.ButtonPressed, { paddingHorizontal: 65 }]}>
          <Image
            style={{
              position: "relative",
              width: 135,
              height: 172,
              marginBottom: 30,
            }}
            source={NewCustomerSelectedIcon}
          />
          <Text style={{ fontSize: 50, color: Colors.white }}>
            New Customer
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.Buttons, { paddingHorizontal: 65 }]}>
          <Image
            style={{
              position: "relative",
              width: 135,
              height: 172,
              marginBottom: 30,
            }}
            source={NewCustomerIcon}
          />
          <Text style={{ fontSize: 50 }}>New Customer</Text>
        </View>
      );
    }
  }

  function ExistingCustomer(toggleBtn2) {
    if (toggleBtn2 === true) {
      return (
        <View
          style={[
            styles.ButtonPressed,
            { paddingHorizontal: 30, paddingVertical: 80 },
          ]}
        >
          <Image
            style={{
              position: "relative",
              width: 184,
              height: 136,
              marginBottom: 30,
            }}
            source={ExistingCustomerSelectedIcon}
          />
          <Text style={{ fontSize: 50, color: Colors.white }}>
            Existing Customer
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.Buttons,
            { paddingHorizontal: 30, paddingVertical: 80 },
          ]}
        >
          <Image
            style={{
              position: "relative",
              width: 184,
              height: 136,
              marginBottom: 30,
            }}
            source={ExistingCustomerIcon}
          />
          <Text style={{ fontSize: 50 }}>Existing Customer</Text>
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

      <View style={styles.ButtonsAlignment}>
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
      {/* <View style={{ flexDirection: "row" }}>
        <NavBtn choice={"Cancel"} nav={navJobOrder} />
        <NavBtn choice={"Next"} nav={navNext} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContent: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
  },
  ButtonsAlignment: {
    top: 200,
    width: "100%",
    alignItems: "center",
  },
  Buttons: {
    margin: 13,
    borderColor: "#cccccc",
    borderWidth: 4,
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 50,
  },
  ButtonPressed: {
    margin: 13,
    borderColor: Colors.black,
    backgroundColor: Colors.black,
    borderWidth: 4,
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 50,
  },
});

export default ClientSelection;
