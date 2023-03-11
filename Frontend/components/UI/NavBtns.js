import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";

function NavBtn({ choice, nav }) {
  let icon;
  let BtnContent = "space-between";
  let BackgroundColor = Colors.yellowDark;
  let BtnBorderColor = Colors.yellowDark;
  let Direction = "row";
  let PaddingLeft = 10;
  let TextColor = Colors.black;

  switch (choice) {
    case "Back":
      icon = <Ionicons name="arrow-back-circle" size={40} color={Colors.yellowDark} />;
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
      PaddingLeft = 0;

      break;
    case "Next":
      icon = <Ionicons name="arrow-forward-circle" size={40} color="black" />;
      break;

    case "Save":
      BtnContent = "center";
      PaddingLeft = 0;
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
    height: 70,
    width: 130,
    alignItems: "center",
    borderWidth: 4,
    paddingRight: 2,
  },
  TextInBtn: {
    fontWeight: "500",
    fontSize: 30,
    paddingBottom: 5,
  },
});

export default NavBtn;
