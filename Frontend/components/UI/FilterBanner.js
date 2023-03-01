import React, { useState } from "react";
import { Banner } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors/Colors";
import CheckBox from "./Checkbox";

function FilterBanner({ visible, filters, updateFilters }) {
  function updateFilterValues(filterKey, filterValue) {
    filters[filterKey] = filterValue;
    updateFilters({ ...filters });
  }

  return (
    <Banner visible={visible} style={styles.bannerSearch}>
      <View style={styles.container}>
        {Object.entries(filters).map(([key, value]) => (
          <View key={key} style={styles.itemFilter}>
            <CheckBox
              id={key}
              onCheck={updateFilterValues}
              checkValue={value}
            />
            <Text style={styles.itemStatus}>{key}</Text>
          </View>
        ))}
      </View>
    </Banner>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 568,
    flexDirection: "column",
  },
  bannerSearch: {
    backgroundColor: Colors.lightYellow,
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
    color: Colors.black,
  },
});

export default FilterBanner;
