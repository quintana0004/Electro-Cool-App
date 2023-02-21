import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import SearchBar from "../components/UI/SearchBar";

function JobOrders({ navigation }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("JobOrders");
  const [filters, setFilters] = useState({
    New: false,
    Working: false,
    Complete: false,
    Canceled: false,
    Heavy: false,
    Light: false,
  });

  //Function of the btns
  function navSelectClient() {
    navigation.navigate("CustomerSelection");
  }

  function navSelectCar() {
    navigation.navigate("CarSelection");
  }

  function navClientInformation() {
    navigation.navigate("ClientInformation");
  }

  function navCompanyPolicy() {
    navigation.navigate("CompanyPolicy");
  }

  function updateSearchTerm(term) {
    setSearch(term);
  }

  return (
    <View style={styles.container}>
      <Header divideH={7} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
        <View style={styles.searchContainer}>
          <SearchBar
            onSearch={updateSearchTerm}
            widthBar={300}
            heightBar={50}
            placeholderText="Search by ID or Name"
          />
        </View>
        <View style={styles.btnCreateContainer}>
          <Button
            onPress={navSelectClient}
            title="Create"
            color={Colors.yellowDark}
            style={styles.btnCreate}
          />
        </View>
      </Header>
      <View style={styles.body}>
        <Text>Job Orders</Text>
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
});

export default JobOrders;
