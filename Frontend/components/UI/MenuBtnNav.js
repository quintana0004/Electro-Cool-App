import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

function MenuBtnNav({ choice, nav }) {
  let icon;
  let paddingBox = 30;

  switch (choice) {
    case "Dashboard":
      // icon = require("../../assets/images/dashboard.png");
      // imageSizeW = 30;
      // imageSizeH = 29;
      paddingBox = 20;
      icon = <MaterialCommunityIcons name="view-dashboard" size={24} color={Colors.yellowDark} />;
      break;
    case "Job Orders":
      icon = <FontAwesome5 name="clipboard-list" size={24} color={Colors.yellowDark} />;
      paddingBox = 50;
      break;
    case "Invoices":
      icon = <FontAwesome5 name="file-invoice-dollar" size={24} color={Colors.yellowDark} />;
      paddingBox = 50;
      break;
    case "Client Book":
      icon = <FontAwesome5 name="address-book" size={24} color={Colors.yellowDark} />;
      paddingBox = 50;
      break;
    case "Calendar":
      icon = <MaterialCommunityIcons name="calendar" size={28} color={Colors.yellowDark} />;
      paddingBox = 50;
      break;
    case "Settings":
      icon = <Ionicons name="settings-sharp" size={24} color={Colors.yellowDark} />;
      paddingBox = 50;
      break;
  }

  return (
    <TouchableOpacity onPress={() => nav()}>
      <View style={[{ paddingHorizontal: paddingBox }, styles.box]}>
        <View style={{ position: "absolute", left: 15 }}>{icon}</View>
        <Text style={styles.txtChoice}>{choice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txtChoice: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    left: 50,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.darkBlack,
    borderRadius: 50,
    width: 155,
    height: 40,
    alignItems: "center",
    marginVertical: 10,
    zIndex: 1,
    marginLeft: 10,
    borderColor: Colors.white,
    borderWidth: 0.2,
  },
});

export default MenuBtnNav;
