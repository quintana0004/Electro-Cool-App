import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import SearchBanner from "../components/UI/SearchBanner";
import TableListClient from "../components/Client Book/TableListClient";
//import { useCustomerInfoStore } from "../Store/store";

function ClientBook({ navigation }) {
  // call the store function
  //const setClientBook = useCustomerInfoStore((state) => state.setClientBook);

  //Function that will toggle the state of searchBanner
  const [openBannerSearch, setOpenBannerSearch] = useState(false);

  //Search Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown style={{ zIndex: 4 }} />
        <Appbar.Content></Appbar.Content>
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setOpenBannerSearch(!openBannerSearch);
          }}
        />
      </Appbar.Header>
      <SearchBanner
        visible={openBannerSearch}
        loading={searchLoading}
        placeholder={"Search by Name"}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <View style={styles.body}>
        <TableListClient
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
  header: {
    backgroundColor: Colors.darkBlack,
  },
});

export default ClientBook;
