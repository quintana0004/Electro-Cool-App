import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Colors from "../../constants/Colors/Colors";
import Header from "../../components/UI/Header";
import Figures from "../../constants/figures/Figures";
import { Appbar } from "react-native-paper";
import NavBtn from "../../components/UI/NavBtns";

function CalendarSelection({ navigation, route}) {
  const { previousScreen, cancelScreen, nextScreen } = route.params;

  function navNext() {
    if (toggleTasks)
      navigation.navigate("Calendar", {
        nextScreen: nextScreen,
        previousScreen: "Calendar",
        cancelScreen: cancelScreen,
      });
    else if (toggleAppointment)
      navigation.navigate("Calendar", {
        client: "",
        nextScreen: nextScreen,
        previousScreen: "Calendar",
        cancelScreen: cancelScreen,
      });
  }

  function navPrevious() {
    navigation.navigate(previousScreen);
  }

  function navCancel() {
    navigation.navigate(cancelScreen);
  }


  const [toggleTasks, setToggleBtn1] = useState(false);
  const [toggleAppointment, setToggleBtn2] = useState(false);

  function TasksView() {
    

    if (toggleTasks === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            source={Figures.VectorWhite}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            Tasks
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image style={styles.VectorWhite} source={Figures.Vector} />
          <Text style={styles.ButtonText}>Tasks</Text>
        </View>
      );
    }
  }

  function AppointmentView(toggleBtn2) {
    if (toggleBtn2 === true) {
      return (
        <View style={styles.ButtonPressed}>
          <Image
            source={Figures.AppointmentWhite}
          />
          <Text style={[styles.ButtonText, { color: Colors.white }]}>
            Appointment
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.Button}>
          <Image
            source={Figures.Appointment}
          />
          <Text style={styles.ButtonText}>Appointment</Text>
        </View>
      );
    }
  }

  return (
    
    <View>
        <Appbar.Header style={styles.HeaderContent}mode="center-aligned">
        <Appbar.Content title="Select option to create card"></Appbar.Content>
        </Appbar.Header>
      <View style={styles.Container}>
        <View>
          <Pressable
            onPress={() => [
              TasksView(),
              setToggleBtn1(!toggleTasks),
              setToggleBtn2(false),
              navigation.navigate("CalendarSelection"),
            ]}
          >
            <View>{TasksView(toggleTasks)}</View>
          </Pressable>
          <Pressable
            onPress={() => [
              AppointmentView(),
              setToggleBtn2(!toggleAppointment),
              setToggleBtn1(false),
            ]}
          >
            <View>{AppointmentView(toggleAppointment)}</View>
          </Pressable>
        </View>
        <View style={styles.naviBtnsPosition}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navPrevious} />
          </View>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navCancel} />
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
    backgroundColor: Colors.yellowDark,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
  },
  Container: {
    alignItems: "center",
    margin: 50,
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

});


export default CalendarSelection;