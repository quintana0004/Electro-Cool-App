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
import Figures from "../../constants/figures/Figures";
import NavBtn from "../../components/UI/NavBtns";
import { Appbar } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

function ClientSelection({ navigation, route }) {
  const pageGoBackAction = StackActions.pop(1);
  const pageGoHomeAction = StackActions.popToTop();

  function navNext() {
    if (toggleNewCustomer) {
      const pageAction = StackActions.push("ClientInformation");
      navigation.dispatch(pageAction);
    } else if (toggleExistingCustomer) {
      const pageAction = StackActions.push("ExistingClient");
      navigation.dispatch(pageAction);
    }
  }

  const [toggleNewCustomer, setToggleNewCustomer] = useState(false);
  const [toggleExistingCustomer, setToggleExistingCustomer] = useState(false);

  function NewCustomer() {
    if (toggleNewCustomer === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            style={styles.NewCustomerIconStyle}
            source={Figures.NewCustomerSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            New Customer
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image
            style={styles.NewCustomerIconStyle}
            source={Figures.NewCustomerIcon}
          />
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
            source={Figures.ExistingCustomerSelectedIcon}
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
            source={Figures.ExistingCustomerIcon}
          />
          <Text style={styles.ButtonText}>Existing Customer</Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(pageGoBackAction);
          }}
        />
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={() => {
            navigation.dispatch(pageGoHomeAction);
          }}
        />
        <Appbar.Content title="Select customer for Job Order"></Appbar.Content>

        <Appbar.Action
          icon="arrow-right"
          iconColor={Colors.black}
          onPress={() => {
            navNext();
          }}
        />
      </Appbar.Header>

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
    margin: 60,
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
  navBtnsPosition: {
    width: 540,
    height: 150,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navCancelBtn: { marginRight: 10 },
  navNextBtn: { marginLeft: 10 },
  header: {
    backgroundColor: Colors.yellowDark,
  },
});

export default ClientSelection;
