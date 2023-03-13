import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors/Colors";

import Header from "../../components/UI/Header";
import SearchBar from "../../components/UI/SearchBar";
import NavBtn from "../../components/UI/NavBtns";
import ExistingClientTableList from "../../components/SearchExisting/ExistingClient/ExistingClientTableList";

function ExistingClient({ route, navigation }) {
  const {
    nextScreen,
    previousScreen,
    cancelScreen,
    otherNextScreen,
    otherPreviousScreen,
  } = route.params;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  function navigateNext() {
    navigation.navigate(nextScreen, {
      client: selectedClient,
      nextScreen: otherNextScreen, // RequestedService.js
      previousScreen: otherPreviousScreen,
      cancelScreen: cancelScreen,
      otherNextScreen: "",
      otherPreviousScreen: "",
    });
  }

  function navigateBack() {
    navigation.navigate(previousScreen);
  }

  function navigateCancel() {
    navigation.navigate(cancelScreen);
  }

  return (
    <View>
      <Header
        divideH={6}
        divideW={1}
        colorHeader={Colors.lightGreen}
        headerStyles={styles.header}
      >
        <View style={styles.searchContainer}>
          <SearchBar
            widthBar={350}
            heightBar={60}
            placeholderText="Search client name"
            onSearch={updateSearchTerm}
          />
        </View>
      </Header>
      <View style={styles.body}>
        <ExistingClientTableList
          searchTerm={searchTerm}
          selectedClient={selectedClient}
          setClient={setSelectedClient}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.navBtnGroup}>
          <View style={styles.navBackBtn}>
            <NavBtn choice={"Back"} nav={navigateBack} />
          </View>
          <View style={styles.navCancelBtn}>
            <NavBtn choice={"Cancel"} nav={navigateCancel} />
          </View>
          <View style={styles.navNextBtn}>
            <NavBtn choice={"Next"} nav={navigateNext} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ExistingClient;

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
    height: 600,
    zIndex: -1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    justifyContent: "center",
    marginTop: 20,
  },
  footer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  navBtnGroup: {
    width: 540,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navBackBtn: {
    marginRight: 130,
  },
  navCancelBtn: {
    marginRight: 10,
  },
  navNextBtn: {
    marginLeft: 10,
  },
});
