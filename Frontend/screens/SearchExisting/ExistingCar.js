import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

import Colors from "../../constants/Colors/Colors";
import ExistingCarTableList from "../../components/SearchExisting/ExistingCar/ExistingCarTableList";
import SearchBanner from "../../components/UI/SearchBanner";
import { useRouterStore } from "../../Store/routerStore";
import { useVehicleInfoStore, useCustomerInfoStore } from "../../Store/JobOrderStore";

function ExistingCar({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchBannerVisibility, setSearchBannerVisibility] = useState(false);
  const existingCarNextPage = useRouterStore(
    (state) => state.existingCarNextPage
  );
  const setVehicleInformation = useVehicleInfoStore(
    (state) => state.setVehicleInformation
  );
  const customerId = useCustomerInfoStore((state) => state.id);

  function navigateNext() {
    setVehicleInformation(
      selectedCar.id,
      selectedCar.brand,
      selectedCar.licensePlate,
      selectedCar.model,
      selectedCar.year,
      selectedCar.mileage,
      selectedCar.color,
      selectedCar.vinNumber,
      selectedCar.carHasItems,
      selectedCar.carItemsDescription,
      selectedCar.customerId
    );
    const pageAction = StackActions.push(existingCarNextPage);
    navigation.dispatch(pageAction);
  }

  function navigateBack() {
    const pageAction = StackActions.pop(1);
    navigation.dispatch(pageAction);
  }

  function navigateCancel() {
    const pageAction = StackActions.popToTop(1);
    navigation.dispatch(pageAction);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchBannerVisibility(!searchBannerVisibility);
          }}
        />
        <Appbar.Content title="Select Existing Car"></Appbar.Content>
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={navigateCancel}
        />
        <Appbar.Action
          icon="arrow-right"
          iconColor={Colors.black}
          onPress={navigateNext}
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
          customerId={customerId}
          searchTerm={searchTerm}
          selectedCar={selectedCar}
          setCar={setSelectedCar}
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
        />
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
