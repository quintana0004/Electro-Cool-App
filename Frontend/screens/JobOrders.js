import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import SearchBar from "../components/UI/SearchBar";
import { Octicons, Ionicons } from "@expo/vector-icons";
import Filter from "../components/UI/filter";
import CheckBox from "../components/UI/checkBox";
import JobOrderItem from "../components/UI/JobOrder-item";
import { FlashList } from "@shopify/flash-list";

function JobOrders({ navigation }) {
  function InfoFiltered(searchedData) {
    //Function that passes data from child to parent
    console.log(searchedData);
  }

  function createJobOrder() {}

  return (
    <View style={styles.container}>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
        <View style={styles.search}>
          <SearchBar
            widthBar={310}
            heightBar={60}
            placeholderText="Search by ID or Name"
            onData={InfoFiltered}
          />
        </View>
        <View style={styles.navBtnCreate}>
          <View style={styles.btnCreate}>
            <Text style={styles.textCreate}>Create</Text>
            <Ionicons name="ios-add-circle-outline" size={35} color="white" />
          </View>
        </View>
      </Header>
      <View style={styles.body}>
        <View style={styles.locateFilter}>
          <Filter />
        </View>
        <View style={styles.headerList}>
          <Text style={styles.textHeader}>Job Order ID</Text>
          <Text style={styles.textHeader}>Name</Text>
          <Text style={styles.textHeader}>Entry Date</Text>
          <Text style={styles.textHeader}>Status</Text>
        </View>
        <JobOrderItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    zIndex: -1,
    marginTop: 140,
  },
  btn: {
    marginVertical: 20,
  },
  search: {
    position: "absolute",
    top: 37,
    left: 115,
  },
  navBtnCreate: {
    position: "absolute",
    top: 37,
    left: 440,
  },
  btnCreate: {
    flexDirection: "row",
    width: 150,
    backgroundColor: Colors.yellowDark,
    borderRadius: 20,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textCreate: {
    fontWeight: "400",
    fontSize: 30,
    paddingBottom: 5,
    color: Colors.white,
    marginRight: 5,
    marginLeft: 5,
  },
  headerList: {
    backgroundColor: Colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 75,
  },
  textHeader: {
    fontWeight: "400",
    fontSize: 20,
  },
  locateFilter: {
    position: "absolute",
    zIndex: 2,
    right: 20,
  },
});

export default JobOrders;
