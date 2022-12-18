import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors/Colors";

function MenuBtnNav({ choice, nav }) {
  let icon;
  let imageSizeW = 15;
  let imageSizeH = 15;
  let paddingBox = 30;

  switch (choice) {
    case "Dashboard":
      icon = require("../../assets/images/dashboard.png");
      imageSizeW = 36;
      imageSizeH = 35;
      paddingBox = 50;
      break;
    case "Job Orders":
      icon = require("../../assets/images/JobOrder.png");
      imageSizeW = 30;
      imageSizeH = 36;
      paddingBox = 50;
      break;
    case "Invoices":
      icon = require("../../assets/images/Invoice.png");
      imageSizeW = 30;
      imageSizeH = 36;
      paddingBox = 60;
      break;
    case "Client Book":
      icon = require("../../assets/images/ClientBook.png");
      imageSizeW = 32;
      imageSizeH = 35;
      paddingBox = 40;
      break;
    case "Calendar":
      icon = require("../../assets/images/Calendar.png");
      imageSizeW = 35;
      imageSizeH = 32;
      paddingBox = 50;
      break;
    case "Settings":
      icon = require("../../assets/images/Setting.png");
      imageSizeW = 35;
      imageSizeH = 34;
      paddingBox = 50;
      break;
  }

  return (
    <TouchableOpacity onPress={() => nav()}>
      <View style={[{ paddingHorizontal: paddingBox }, styles.box]}>
        <Image
          style={{
            width: imageSizeW,
            height: imageSizeH,
            position: "absolute",
            left: 25,
          }}
          source={icon}
        />
        <Text style={styles.txtChoice}>{choice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txtChoice: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    left: 70,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.yellowDark,
    borderRadius: 50,
    width: 210,
    height: 72,
    alignItems: "center",
    marginVertical: 10,
    zIndex: 1,
    marginLeft: 30,
  },
});

export default MenuBtnNav;
