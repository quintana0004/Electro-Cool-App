import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import Colors from "../../constants/Colors/Colors";
import NavBtn from "../../components/UI/NavBtns";
import ExistingCarTableList from "../../components/SearchExisting/ExistingCar/ExistingCarTableList";
import SearchBanner from "../../components/UI/SearchBanner";

function ExistingCar({ route, navigation }) {
  const { nextScreen, previousScreen, cancelScreen, client } = route.params;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchBannerVisibility, setSearchBannerVisibility] = useState(false);

  function navigateNext() {
    navigation.navigate(nextScreen, { client: client, car: selectedCar });
  }

  function navigateBack() {
    navigation.navigate(previousScreen, {
      nextScreen: "ExistingCars",
      previousScreen: cancelScreen,
      otherNextScreen: nextScreen,
      otherPreviousScreen: previousScreen,
      cancelScreen: cancelScreen,
    });
  }

  function navigateCancel() {
    navigation.navigate(cancelScreen);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title="Select Existing Car"></Appbar.Content>
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchBannerVisibility(!searchBannerVisibility);
          }}
        />
      </Appbar.Header>
      <SearchBanner
        placeholder={"Search by license plate"}
        visible={searchBannerVisibility}
        loading={searchLoading}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <View style={styles.body}>
        <ExistingCarTableList
          searchTerm={searchTerm}
          selectedCar={selectedCar}
          setCar={setSelectedCar}
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
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

export default ExistingCar;

const styles = StyleSheet.create({
  body: {
    zIndex: -1,
  },
  header: {
    backgroundColor: Colors.lightGreenHeader,
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
