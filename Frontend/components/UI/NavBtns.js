import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors/Colors";

function NavBtn({ choice, nav }) {
  let icon;
  let BtnContent = "space-between";
  let BackgroundColor = Colors.yellowDark;
  let BtnBorderColor = Colors.yellowDark;
  let Direction = "row";
  let PaddingLeft = 20;
  let TextColor = Colors.black;

  switch (choice) {
    case "Back":
      icon = (
        <Ionicons
          name="arrow-back-circle"
          size={55}
          color={Colors.yellowDark}
        />
      );
      BackgroundColor = Colors.white;
      BtnBorderColor = Colors.yellowDark;
      Direction = "row-reverse";
      TextColor = Colors.yellowDark;

      break;
    case "Cancel":
      icon = "";
      BtnContent = "center";
      BackgroundColor = "#D9D9D9";
      BtnBorderColor = "#D9D9D9";
      TextColor = Colors.darkGreyAsh;
      PaddingLeft = 10;

      break;
    case "Next":
      icon = <Ionicons name="arrow-forward-circle" size={50} color="black" />;
      break;
  }

  return (
    <TouchableOpacity onPress={() => nav()}>
      <View
        style={[
          {
            justifyContent: BtnContent,
            backgroundColor: BackgroundColor,
            borderColor: BtnBorderColor,
            flexDirection: Direction,
            paddingLeft: PaddingLeft,
          },
          styles.Buttons,
        ]}
      >
        <Text style={[styles.TextInBtn, { color: TextColor }]}>{choice}</Text>
        <View>{icon}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Buttons: {
    borderRadius: 60,
    height: 90,
    width: 200,
    alignItems: "center",
    borderWidth: 6,
    paddingRight: 10,
  },
  TextInBtn: {
    fontWeight: "500",
    fontSize: 43,
    paddingBottom: 5,
  },
});

export default NavBtn;
