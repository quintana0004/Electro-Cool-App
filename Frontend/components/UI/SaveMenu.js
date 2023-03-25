import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import SaveBtn from "./SaveBtn";
import Colors from "../../constants/Colors/Colors";
import NavBtn from "./NavBtns";

function SaveMenu({ onSelection, isRevokeActive }) {
  const [isMenuVisibile, setIsMenuVisibile] = useState(false);

  function onMenuPress() {
    setIsMenuVisibile((prev) => !prev);
  }

  function onButtonPress(option) {
    onSelection(option);
  }

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        {isMenuVisibile && (
          <View style={styles.boxOption}>
            <SaveBtn label={"Done"} onPress={onButtonPress.bind(this, "Pending")}>
              <Ionicons name="checkmark-done-sharp" size={24} color="black" />
            </SaveBtn>
            <SaveBtn label={"Draft"} onPress={onButtonPress.bind(this, "In Draft")}>
              <MaterialCommunityIcons name="pencil-circle" size={24} color="black" />
            </SaveBtn>
            <SaveBtn label={"Pay"} onPress={onButtonPress.bind(this, "Paid")}>
              <AntDesign name="wallet" size={24} color="black" />
            </SaveBtn>
            {isRevokeActive && (
              <SaveBtn label={"Revoke"} onPress={onButtonPress.bind(this, "Canceled")}>
                <MaterialCommunityIcons name="file-cancel-outline" size={24} color="black" />
              </SaveBtn>
            )}
          </View>
        )}
      </View>
      <NavBtn choice={"Save"} nav={onMenuPress} />
    </View>
  );
}

export default SaveMenu;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  boxOption: {
    position: "absolute",
    left: 10,
    bottom: 0,
    zIndex: 1,
  },

  txtChoice: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    left: 50,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
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
  menu: {
    position: "absolute",
  },
});
