import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors/Colors";
import MenuBtnNav from "../UI/MenuBtnNav";

function MenuDropDown() {
  //Navigate to the corresponding pages
  const navigation = useNavigation();

  //Set the toggle btn when closed or open
  const [toggle, setToggleBtn] = useState(false);

  //Create the variable to hold the icon
  let iconChoice = (
    <MaterialCommunityIcons name="window-close" size={50} color={Colors.yellowDark} />
  );

  //Verify the toggle to change the icon
  if (toggle === true) {
    iconChoice = <MaterialCommunityIcons name="window-close" size={50} color={Colors.yellowDark} />;
  } else if (toggle === false) {
    iconChoice = <SimpleLineIcons name="menu" size={40} color={Colors.yellowDark} />;
  }

  function navDashboard() {
    navigation.navigate("Dashboard");
    setToggleBtn(false);
  }

  function navJobOrder() {
    navigation.navigate("JobOrders");
    setToggleBtn(false);
  }

  function navInvoices() {
    navigation.navigate("Invoices");
    setToggleBtn(false);
  }

  function navClientBook() {
    navigation.navigate("ClientBook");
    setToggleBtn(false);
  }

  function navCalendar() {
    navigation.navigate("Calendar");
    setToggleBtn(false);
  }

  function navSettings() {
    navigation.navigate("Settings");
    setToggleBtn(false);
  }

  return (
    <Pressable
      onPress={() => {
        setToggleBtn(!toggle);
      }}
    >
      <View style={styles.circle}>{iconChoice}</View>
      {toggle && (
        <View style={styles.boxOption}>
          <MenuBtnNav choice={"Dashboard"} nav={navDashboard} />
          <MenuBtnNav choice={"Job Orders"} nav={navJobOrder} />
          <MenuBtnNav choice={"Invoices"} nav={navInvoices} />
          <MenuBtnNav choice={"Client Book"} nav={navClientBook} />
          <MenuBtnNav choice={"Calendar"} nav={navCalendar} />
          <MenuBtnNav choice={"Settings"} nav={navSettings} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 40,
    marginLeft: 30,
  },
  boxOption: {
    position: "absolute",
    top: 150,
  },
});

export default MenuDropDown;
