import React, { useState } from "react";
import { Banner } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";
import CheckBox from "./Checkbox";

function FilterBanner({ visible, filters, updateFilters }) {
  function updateFilterValues(filterKey, filterValue) {
    filters[filterKey] = filterValue;
    updateFilters({ ...filters });
  }

  return (
    <Banner visible={visible} style={styles.bannerSearch}>
      {Object.entries(filters).map(([key, value]) => (
        <View key={key} style={[styles.itemFilter, { paddingBottom: 10 }]}>
          <CheckBox id={key} onCheck={updateFilterValues} checkValue={value} />
          <Text style={styles.itemStatus}>{key}</Text>
        </View>
      ))}
    </Banner>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 568,
    flexDirection: "column",
  },
  bannerSearch: {
    backgroundColor: Colors.lightYellow,
  },
  itemFilter: {
    flexDirection: "row",
  },
  itemStatus: {
    fontWeight: "400",
    fontSize: 20,
    marginLeft: 3,
    color: Colors.black,
    marginRight: 5,
  },
});

export default FilterBanner;
