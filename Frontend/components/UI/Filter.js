import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";
import CheckBox from "./Checkbox.js";

function Filter({ filters, updateFilters }) {
  const [filter, setFilter] = useState(false);

  function updateFilterValues(filterKey, filterValue) {
    filters[filterKey] = filterValue;
    updateFilters({ ...filters });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setFilter(!filter)}>
        <View style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={40} color="white" />
        </View>
      </Pressable>
      {filter && (
        <View style={styles.filterContainer}>
          {Object.entries(filters).map(([key, value]) => (
            <View key={key} style={styles.itemFilter}>
              <CheckBox id={key} onCheck={updateFilterValues} value={value} />
              <Text style={styles.itemStatus}>{key}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9998,
  },
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
