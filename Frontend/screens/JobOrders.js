import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import MenuDropDown from "../components/Navigation/MenuDropDown";

function JobOrders({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <Appbar.Content></Appbar.Content>
        <Appbar.Action icon="filter" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="plus" onPress={console.log("ADDD")} />
      </Appbar.Header>
    </View>
  );
}

{
  /* <Searchbar
placeholder="Search by ID or Name"
onChangeText={onChangeSearch}
value={searchQuery}
/> */
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
