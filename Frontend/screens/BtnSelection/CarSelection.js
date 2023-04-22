import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors/Colors";
import Figures from "../../constants/figures/Figures";
import NavBtn from "../../components/UI/NavBtns";
import { StackActions } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

function CarSelection({ navigation, route }) {
  function navNext() {
    if (toggleNewCar) {
      const pageAction = StackActions.push("VehicleInformation");
      navigation.dispatch(pageAction);
    } else if (toggleExistingCar) {
      const pageAction = StackActions.push("ExistingCar");
      navigation.dispatch(pageAction);
    }
  }

  function navPrevious() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navCancel() {
    const pageAction = StackActions.popToTop();
    navigation.dispatch(pageAction);
  }

  const [toggleNewCar, setToggleBtn1] = useState(false);
  const [toggleExistingCar, setToggleBtn2] = useState(false);

  function NewcarView() {
    if (toggleNewCar === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            style={styles.NewCarIconStyle}
            source={Figures.NewCarSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            New Car
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image style={styles.NewCarIconStyle} source={Figures.NewCarIcon} />
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
            source={Figures.ExistingCarSelectedIcon}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            Existing Car
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image
            style={styles.ExistingCarIconStyle}
            source={Figures.ExistingCarIcon}
          />
          <Text style={styles.ButtonText}>Existing Car</Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navPrevious();
          }}
        />
        <Appbar.Content title="Select a Vehicle"></Appbar.Content>
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={() => {
            navCancel();
          }}
        />
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
  naviBtnsPosition: {
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
  header: {
    backgroundColor: Colors.yellowDark,
  },
});

export default CarSelection;
