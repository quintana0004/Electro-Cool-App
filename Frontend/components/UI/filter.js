import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";
import CheckBox from "./checkBox";

function Filter() {
  const [filter, setFilter] = useState(false);
  const [groupCheckBox, setGroupCheckBox] = useState({
    New: false,
    Working: false,
    Complete: false,
    Canceled: false,
    Heavy: false,
    Light: false,
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setFilter(!filter)}>
        <View style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={40} color="white" />
        </View>
      </Pressable>
      {filter && (
        <View style={styles.filterContainer}>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.New = value;
              }}
              valueCheck={groupCheckBox.New}
            />
            <Text style={styles.itemStatus}>New</Text>
          </View>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.Working = value;
              }}
              valueCheck={groupCheckBox.Working}
            />
            <Text style={styles.itemStatus}>Working</Text>
          </View>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.Complete = value;
              }}
              valueCheck={groupCheckBox.Complete}
            />
            <Text style={styles.itemStatus}>Complete</Text>
          </View>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.Canceled = value;
              }}
              valueCheck={groupCheckBox.Canceled}
            />
            <Text style={styles.itemStatus}>Canceled</Text>
          </View>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.Heavy = value;
              }}
              valueCheck={groupCheckBox.Heavy}
            />
            <Text style={styles.itemStatus}>Heavy</Text>
          </View>
          <View style={styles.itemFilter}>
            <CheckBox
              onValueCheck={(value) => {
                groupCheckBox.Light = value;
              }}
              valueCheck={groupCheckBox.Light}
            />
            <Text style={styles.itemStatus}>Light</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterBtn: {
    padding: 10,
    backgroundColor: Colors.yellowDark,
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.darkGrey,
    borderRadius: 10,
    padding: 10,
    width: 160,
    position: "absolute",
    top: 70,
    right: 2,
  },
  itemFilter: {
    flexDirection: "row",
    marginVertical: 5,
  },
  itemStatus: {
    fontWeight: "400",
    fontSize: 20,
    color: Colors.darkGreyAsh,
    marginLeft: 10,
  },
});

export default Filter;
