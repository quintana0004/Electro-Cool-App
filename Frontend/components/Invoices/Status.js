import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors/Colors";

function Status({ status, parentContainerStyles, parentTextStyles }) {
  function containerStyles() {
    let classes = [styles.container];
    if (status === "In Draft") {
      classes.push(styles.InDraftContainerColors);
    } else if (status === "Paid") {
      classes.push(styles.PaidContainerColors);
    } else if (status === "Canceled") {
      classes.push(styles.CanceledContainerColors);
    } else {
      classes.push(styles.PendingContainerColors);
    }

    return classes;
  }

  function textStyles() {
    let classes = [];
    if (status === "In Draft") {
      classes.push(styles.InDraftTextColors);
    } else if (status === "Paid") {
      classes.push(styles.PaidTextColors);
    } else if (status === "Canceled") {
      classes.push(styles.CanceledTextColors);
    } else {
      classes.push(styles.PendingTextColors);
    }

    return classes;
  }

  return (
    <View style={[containerStyles(), parentContainerStyles]}>
      <Text style={[textStyles(), parentTextStyles]}>{status}</Text>
    </View>
  );
}

export default Status;

const styles = StyleSheet.create({
  container: {
    height: 35,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  InDraftContainerColors: {
    backgroundColor: "rgba(210, 25, 71, 0.3);",
    borderColor: Colors.darkOrange,
  },
  PaidContainerColors: {
    backgroundColor: "rgba(40, 160, 103, 0.3);",
    borderColor: Colors.darkGreenMoney,
  },
  PendingContainerColors: {
    backgroundColor: "rgba(4, 106, 187, 0.3);",
    borderColor: Colors.darkBlue,
  },
  CanceledContainerColors: {
    backgroundColor: "rgba(210, 25, 71, 0.3)",
    borderColor: Colors.darkRed,
  },
  InDraftTextColors: {
    color: Colors.darkOrange,
  },
  PaidTextColors: {
    color: Colors.darkGreenMoney,
  },
  PendingTextColors: {
    color: Colors.darkBlue,
  },
  CanceledTextColors: {
    color: Colors.darkRed,
  },
});
