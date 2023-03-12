import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import SearchBanner from "../components/UI/SearchBanner";
import FilterBanner from "../components/UI/FilterBanner";
import TableListOrder from "../components/Job Order/TableListOrder";
import JobOrderData from "../../Frontend/constants/Dummy_Data/JobOrderData";
import { Menu } from "react-native-paper";

function JobOrders({ navigation }) {
  //Function that will toggle the state of searchBanner and filterBanner
  const [openBannerSearch, setOpenBannerSearch] = useState(false);
  const [openBannerFilter, setOpenBannerFilter] = useState(false);

  //Filter Content
  const [filters, setFilters] = useState({
    Complete: false,
    Canceled: false,
    Working: false,
    New: false,
    Heavy: false,
    Light: false,
  });

  //Search Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <Appbar.Content></Appbar.Content>
        <Appbar.Action
          icon="filter"
          onPress={() => {
            setOpenBannerFilter(!openBannerFilter);
            setOpenBannerSearch(false);
          }}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setOpenBannerSearch(!openBannerSearch);
            setOpenBannerFilter(false);
          }}
        />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("CustomerSelection", {
              previousScreen: "JobOrderMain",
              cancelScreen: "JobOrderMain",
            });
          }}
        />
      </Appbar.Header>
      <SearchBanner
        visible={openBannerSearch}
        loading={searchLoading}
        placeholder={"Search by ID or Name"}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <FilterBanner
        visible={openBannerFilter}
        filters={filters}
        updateFilters={setFilters}
      />
      <View style={styles.body}>
        <TableListOrder
          filters={filters}
          searchLoading={searchLoading}
          searchTerm={searchTerm}
          setSearchLoading={setSearchLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    zIndex: -1,
  },
  btn: {
    marginVertical: 20,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 35,
    marginTop: 10,
  },
  btnCreate: {},
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default JobOrders;
