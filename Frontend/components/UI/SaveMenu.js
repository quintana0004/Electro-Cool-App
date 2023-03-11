import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SaveBtn from "./SaveBtn";
import Colors from "../../constants/Colors/Colors";
import NavBtn from "./NavBtns";
import Figures from "../../constants/figures/Figures";

function SaveMenu({ onSelection }) {
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
            <SaveBtn
              label={"Done"}
              icon={Figures.DoneIcon}
              onPress={onButtonPress.bind(this, "Done")}
            />
            <SaveBtn
              label={"Draft"}
              icon={Figures.DraftIcon}
              onPress={onButtonPress.bind(this, "In Draft")}
            />
            <SaveBtn
              label={"Pay"}
              icon={Figures.PayIcon}
              onPress={onButtonPress.bind(this, "Paid")}
            />
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
