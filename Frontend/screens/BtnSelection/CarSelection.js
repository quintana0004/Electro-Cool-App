import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import NavBtn from "../../components/UI/NavBtns";

function CarSelection({ navigation }) {
  //////////////////////////////////////////

  function navNext() {
    if (toggleBtn1) navigation.navigate("VehicleInformation");
    else if (toggleBtn2) navigation.navigate("ExistingCar");
  }

  function navClientInformation() {
    navigation.navigate("ClientInformation");
  }
  function navJobOrder() {
    navigation.navigate("JobOrderMain");
  }

  ///////////////////////////////////////
  const [toggleBtn1, setToggleBtn1] = useState(false);
  const [toggleBtn2, setToggleBtn2] = useState(false);

  let NewCarICon = <Ionicons name="car-sport" size={200} color="black" />;
  let ExistingCarIcon = (
    <MaterialCommunityIcons name="car-wrench" size={200} color="black" />
  );

  function NewcarView() {
    if (toggleBtn1 === true) {
      NewCarICon = <Ionicons name="car-sport" size={200} color="white" />;
      return (
        <View style={[styles.ButtonPressed, { paddingHorizontal: 130 }]}>
          <View>{NewCarICon}</View>
          <Text style={{ fontSize: 50, color: Colors.white }}>New Car</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.Buttons, { paddingHorizontal: 130 }]}>
          <View>{NewCarICon}</View>
          <Text style={{ fontSize: 50 }}>New Car</Text>
        </View>
      );
    }
  }

  function ExistingCarView(toggleBtn2) {
    if (toggleBtn2 === true) {
      ExistingCarIcon = (
        <MaterialCommunityIcons name="car-wrench" size={200} color="white" />
      );

      return (
        <View style={[styles.ButtonPressed, { paddingHorizontal: 100 }]}>
          <View>{ExistingCarIcon}</View>
          <Text style={{ fontSize: 50, color: Colors.white }}>
            Existing Car
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.Buttons, { paddingHorizontal: 100 }]}>
          <View>{ExistingCarIcon}</View>
          <Text style={{ fontSize: 50 }}>Existing Car</Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Header divideH={8} divideW={1.1} colorHeader={Colors.yellowDark}>
        <View style={styles.HeaderContent}>
          <Text style={styles.title}>Select car from client for Job Order</Text>
        </View>
      </Header>
      <View style={styles.ButtonsAlignment}>
        <TouchableOpacity
          onPress={() => [
            NewcarView(),
            setToggleBtn1(!toggleBtn1),
            setToggleBtn2(false),
          ]}
        >
          <View>{NewcarView(toggleBtn1)}</View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => [
            ExistingCarView(),
            setToggleBtn2(!toggleBtn2),
            setToggleBtn1(false),
          ]}
        >
          <View>{ExistingCarView(toggleBtn2)}</View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <NavBtn choice={"Back"} nav={navClientInformation} />
        <NavBtn choice={"Cancel"} nav={navJobOrder} />
        <NavBtn choice={"Next"} nav={navNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContent: {
    position: "absolute",
    top: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    left: 90,
  },
  ButtonsAlignment: {
    alignItems: "center",
    top: 200,
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

export default CarSelection;
