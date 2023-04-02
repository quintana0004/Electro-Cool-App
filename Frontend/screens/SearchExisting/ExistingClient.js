import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

import { useRouterStore } from "../../Store/routerStore";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";

import Colors from "../../constants/Colors/Colors";
import NavBtn from "../../components/UI/NavBtns";
import ExistingClientTableList from "../../components/SearchExisting/ExistingClient/ExistingClientTableList";
import SearchBanner from "../../components/UI/SearchBanner";

function ExistingClient({ navigation }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchBannerVisibility, setSearchBannerVisibility] = useState(false);
  const existingClientNextPage = useRouterStore(
    (state) => state.existingClientNextPage
  );
  const setCustomerInfo = useCustomerInfoStore(
    (state) => state.setCustomerInfo
  );

  function navigateNext() {
    setCustomerInfo(
      selectedClient.id,
      selectedClient.firstName,
      selectedClient.lastName,
      selectedClient.phone,
      selectedClient.email
    );
    const pageAction = StackActions.push(existingClientNextPage);
    navigation.dispatch(pageAction);
  }

  function navigateBack() {
    const pageGoBack = StackActions.pop(1);
    navigation.dispatch(pageGoBack);
  }

  function navigateCancel() {
    const pageGoHomeAction = StackActions.popToTop();
    navigation.dispatch(pageGoHomeAction);
  }

  return (
    <View>
      <Appbar.Header style={styles.header} mode="center-aligned">
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Action
          icon="home"
          iconColor={Colors.black}
          onPress={navigateCancel}
        />
        <Appbar.Content title="Select Existing Client"></Appbar.Content>
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchBannerVisibility(!searchBannerVisibility);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          iconColor={Colors.black}
          onPress={navigateNext}
        />
      </Appbar.Header>
      <SearchBanner
        placeholder={"Search client name"}
        visible={searchBannerVisibility}
        loading={searchLoading}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <View style={styles.body}>
        <ExistingClientTableList
          searchTerm={searchTerm}
          selectedClient={selectedClient}
          setClient={setSelectedClient}
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
        />
      </View>
    </View>
  );
}

export default ExistingClient;

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
