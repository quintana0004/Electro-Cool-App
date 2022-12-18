import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import NavBtn from "../../components/UI/NavBtns";

function CarSelection({ navigation }) {
  function navNext() {
    if (toggleNewCar) navigation.navigate("VehicleInformation");
    else if (toggleExistingCar) navigation.navigate("ExistingCar");
  }

  function navClientInformation() {
    navigation.navigate("ClientInformation");
  }
  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  const [toggleNewCar, setToggleBtn1] = useState(false);
  const [toggleExistingCar, setToggleBtn2] = useState(false);

  let NewCarIcon = require("../../assets/images/NewCarIcon.png");
  let NewCarSelectedICon = require("../../assets/images/NewCarSelectedIcon.png");
  let ExistingCarIcon = require("../../assets/images/ExistingCarIcon.png");
  let ExistingCarSelectedIcon = require("../../assets/images/ExistingCarSelectedIcon.png");

  function NewcarView() {
    if (toggleNewCar === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image style={styles.NewCarIconStyle} source={NewCarSelectedICon} />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            New Car
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image style={styles.NewCarIconStyle} source={NewCarIcon} />
          <Text style={styles.ButtonText}>New Car</Text>
        </View>
      );
    }
  }

  function ExistingCarView(toggleBtn2) {
    if (toggleBtn2 === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            style={styles.ExistingCarIconStyle}
            source={ExistingCarSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            Existing Car
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image style={styles.ExistingCarIconStyle} source={ExistingCarIcon} />
          <Text style={styles.ButtonText}>Existing Car</Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Header divideH={8} divideW={1.1} colorHeader={Colors.yellowDark}>
        <View style={styles.HeaderContent}>
          <Text style={styles.title}>
            Select car from customer for Job Order
          </Text>
        </View>
      </Header>
      <View style={styles.Container}>
        <View>
          <Pressable
            onPress={() => [
              NewcarView(),
              setToggleBtn1(!toggleNewCar),
              setToggleBtn2(false),
            ]}
          >
            <View>{NewcarView(toggleNewCar)}</View>
          </Pressable>
          <Pressable
            onPress={() => [
              ExistingCarView(),
              setToggleBtn2(!toggleExistingCar),
              setToggleBtn1(false),
            ]}
          >
            <View>{ExistingCarView(toggleExistingCar)}</View>
          </Pressable>
        </View>
        <View style={styles.navBtnsPosition}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navClientInformation} />
          </View>
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
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 27,
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
  ButtonText: { fontSize: 40 },
  NewCarIconStyle: {
    width: 150,
    height: 100,
    marginBottom: 25,
  },
  ExistingCarIconStyle: {
    height: 130,
    width: 124,
    marginBottom: 30,
  },
  navBtnsPosition: {
    width: 540,
    height: 150,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
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

export default CarSelection;
