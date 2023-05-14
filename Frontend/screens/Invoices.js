import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import MenuDropDown from "../components/UI/MenuDropDown";
import SearchBanner from "../components/UI/SearchBanner";
import FilterBanner from "../components/UI/FilterBanner";
import TableListInvoice from "../components/Invoices/TableListInvoice";
import ToggleButtons from "../components/Invoices/ToggleButtons";
import ActionBtn from "../components/UI/ActionBtn";
import Colors from "../constants/Colors/Colors";
import { useRouterStore } from "../Store/routerStore";
import { useInvoiceStore } from "../Store/invoiceStore";
import { useDepositStore } from "../Store/depositStore";

function Invoices({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchBannerVisibility, setSearchBannerVisibility] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Invoices");
  const [filters, setFilters] = useState({
    Paid: false,
    Pending: false,
    Canceled: false,
    "In Draft": false,
  });
  const [filterBannerVisibility, setFilterBannerVisibility] = useState(false);

  const setExistingClientNextPage = useRouterStore(
    (state) => state.setExistingClientNextPage
  );
  const setExistingCarNextPage = useRouterStore(
    (state) => state.setExistingCarNextPage
  );
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice);
  const resetDeposit = useDepositStore((state) => state.resetDeposit);

  function navigateToCreateInvoiceFlow() {
    resetInvoice();
    resetDeposit();
    setExistingClientNextPage("ExistingCars");
    setExistingCarNextPage("InvoiceDetail");
    navigation.navigate("ExistingClients");
  }

  function navigateToCreateDepositFlow() {
    resetInvoice();
    resetDeposit();
    setExistingClientNextPage("ExistingCars");
    setExistingCarNextPage("DepositDetail");
    navigation.navigate("ExistingClients");
  }

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <MenuDropDown />
        <Appbar.Content></Appbar.Content>
        <Appbar.Action
          icon="filter"
          onPress={() => {
            setFilterBannerVisibility(!filterBannerVisibility);
            setSearchBannerVisibility(false);
          }}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchBannerVisibility(!searchBannerVisibility);
            setFilterBannerVisibility(false);
          }}
        />
      </Appbar.Header>
      <SearchBanner
        placeholder={"Search client name"}
        visible={searchBannerVisibility}
        loading={searchLoading}
        setLoading={setSearchLoading}
        setSearchTerm={setSearchTerm}
      />
      <FilterBanner
        visible={filterBannerVisibility}
        filters={filters}
        updateFilters={setFilters}
      />

      <View style={styles.body}>
        <View style={styles.actionButtonGroup}>
          <ActionBtn onPress={navigateToCreateDepositFlow}>
            Create Deposit
          </ActionBtn>
          <ActionBtn onPress={navigateToCreateInvoiceFlow}>
            Create Invoice
          </ActionBtn>
        </View>

        <View>
          <ToggleButtons
            toggleActiveCategory={updateActiveCategory}
            activeCategory={activeCategory}
          />
        </View>

        <TableListInvoice
          activeCategory={activeCategory}
          searchTerm={searchTerm}
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
          filters={filters}
        />
      </View>
    </View>
  );
}

export default Invoices;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkBlack,
  },
  body: {
    marginTop: 10,
    zIndex: -1,
  },
  actionButtonGroup: {
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 35,
    marginTop: 20,
  },
});
