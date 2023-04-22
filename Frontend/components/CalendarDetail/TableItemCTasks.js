import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/Colors/Colors";
import { format } from "date-fns";
import { Avatar } from "react-native-paper";

function TableItemCTasks({ id, text, dueDate }) {
  function DateText() {
    return format(new Date(dueDate), "MM/dd/yyyy");
  }

  return (
    <View>
      <View style={styles.content}>
        <View style={{ width: 250, marginLeft: 15 }}>
          <Text style={styles.boldText}>{text}</Text>
        </View>
        <View style={{ width: 250 }}>
          <Text style={styles.boldText}>{DateText()}</Text>
        </View>
        <Pressable onPress={async () => {}}>
          <Avatar.Icon
            size={35}
            icon="delete"
            style={{
              backgroundColor: "#D9D9D9",
              color: Colors.darkGrey,
              alignItems: "center",
              marginRight: 40,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default TableItemCTasks;
