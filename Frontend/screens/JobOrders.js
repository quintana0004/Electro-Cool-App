import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/UI/Header";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import Colors from "../constants/Colors/Colors";
import SearchBar from "../components/UI/SearchBar";

function JobOrders({ navigation }) {
  function InfoFiltered(searchedData) {
    //Function that passes data from child to parent
    console.log(searchedData);
  }

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
      </Header>
      <View style={styles.body}></View>
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
  search: {
    position: "absolute",
    top: 37,
    left: 115,
  },
});

export default JobOrders;
