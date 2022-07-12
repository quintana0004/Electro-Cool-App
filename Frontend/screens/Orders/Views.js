// --- React Native ---
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// --- Components Created for this screen ---
import { Colors } from "../../constants/colors";
import Filter from "../../components/UI/Filter";
import BackButton from "../../components/UI/BackButton";
import SearchBar from "../../components/UI/SearchBar";
import JobList from "../../components/UI/JobList";

// --- Data Files ---
import Clients from "../../constants/dummy-data/view-dummy";

function Views() {
  const navigation = useNavigation();

  function goBackHandler() {
    return navigation.goBack();
  }

  function filterJobOrder(typeJobOrder, levelJobOrder) {}

  function searchJobOrder(search) {}

  return (
    <View style={styles.constainer}>
      <View style={styles.contain}>
        <View style={styles.header}>
          <BackButton handler={goBackHandler} />
          <SearchBar onSearch={searchJobOrder} />
          <Filter onFilter={filterJobOrder} />
        </View>
        <View style={styles.list}>
          <JobList JobOrderInfo={Clients} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  contain: {
    flex: 1,
    marginLeft: 115,
  },
  list: {
    marginTop: 15,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
});

export default Views;
