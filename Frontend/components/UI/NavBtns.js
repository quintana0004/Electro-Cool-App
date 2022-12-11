import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors/Colors";

function NavBtn({ choice, nav }) {
  let icon;
  let BtnContent = "space-between";
  let BackgroundColor = Colors.yellowDark;
  let BtnBorderColor = Colors.yellowDark;
  let Direction = "row";
  let BtnWith = 180;
  let PaddingLeft = 20;
  let PaddingRight = 10;
  let MoveRight = 10;
  let MoveLeft = 10;
  let TextColor = Colors.black;

  switch (choice) {
    case "Back":
      icon = (
        <Ionicons
          name="arrow-back-circle"
          size={50}
          color={Colors.yellowDark}
        />
      );
      BackgroundColor = Colors.white;
      BtnBorderColor = Colors.yellowDark;
      Direction = "row-reverse";
      MoveRight = 30;
      TextColor = Colors.yellowDark;

      break;
    case "Cancel":
      icon = <Text></Text>;
      BtnContent = "center";
      BackgroundColor = "#D9D9D9";
      BtnBorderColor = "#D9D9D9";
      TextColor = Colors.darkGreyAsh;
      MoveRight = 310;
      PaddingLeft = 10;

      break;
    case "Next":
      icon = <Ionicons name="arrow-forward-circle" size={50} color="black" />;
      MoveRight = 330;

      break;

    case "Done":
      paddingBox = 0;
      break;
    case "Confirm":
      paddingBox = 0;
      break;
    case "Save":
      paddingBox = 0;
      break;
    case "Generate Invoice":
      paddingBox = 0;
      break;
    case "Payment":
      paddingBox = 0;
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
            width: BtnWith,
            flexDirection: Direction,
            paddingLeft: PaddingLeft,
            paddingRight: PaddingRight,
            left: MoveRight,
            Right: MoveLeft,
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
    height: 72,
    alignItems: "center",
    borderWidth: 6,
    top: 300,
  },
  TextInBtn: {
    fontWeight: "500",
    fontSize: 36,
  },
});

export default NavBtn;
