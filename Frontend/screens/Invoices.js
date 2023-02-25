import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TableList from "../components/Invoices/TableList";
import ToggleButtons from "../components/Invoices/ToggleButtons";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import ActionBtn from "../components/UI/ActionBtn";
import Filter from "../components/UI/Filter";
import Header from "../components/UI/Header";
import SearchBar from "../components/UI/SearchBar";
import Colors from "../constants/Colors/Colors";
import Figures from "../constants/figures/Figures";

const BOTTOM_APPBAR_HEIGHT = 180;

function Invoices({ navigation }) {
  const { bottom } = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Invoices");
  const [filters, setFilters] = useState({
    Paid: false,
    Pending: false,
    Canceled: false,
    "In Draft": false,
  });

  function navigateToFindExistingClientScreen() {
    navigation.navigate("ExistingClients", {
      nextScreen: "ExistingCars",
      previousScreen: "InvoiceMain",
      cancelScreen: "InvoiceMain",
      otherNextScreen: "InvoiceDetail",
      otherPreviousScreen: "ExistingClients",
    });
  }

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  return (
    <View>
      <Appbar.Header
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
          },
        ]}
      >
        <MenuDropDown />
        <View style={styles.searchContainer}>
          <SearchBar
            widthBar={350}
            heightBar={60}
            placeholderText="Search by ID or Name"
            onSearch={updateSearchTerm}
          />
        </View>
      </Appbar.Header>

      {/* <Header divideH={6} divideW={1} colorHeader={Colors.darkBlack}>
        
      </Header> */}
      <View style={styles.body}>
        <View style={styles.actionButtonGroup}>
          <ActionBtn onPress={navigateToFindExistingClientScreen}>Create Deposit</ActionBtn>

          <View style={styles.actionRightButtonGroup}>
            <Filter filters={filters} updateFilters={setFilters} image={Figures.FilterIcon} />
            <ActionBtn style={{ marginLeft: 10 }} onPress={navigateToFindExistingClientScreen}>
              Create Invoice
            </ActionBtn>
          </View>
        </View>

        <View>
          <ToggleButtons
            toggleActiveCategory={updateActiveCategory}
            activeCategory={activeCategory}
          />
        </View>

        <TableList activeCategory={activeCategory} searchTerm={searchTerm} filters={filters} />
      </View>
    </View>
  );
}

export default Invoices;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: Colors.darkBlack,
  },
  body: {
    marginTop: 20,
    zIndex: -1,
  },
  actionButtonGroup: {
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionRightButtonGroup: {
    flexDirection: "row",
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 35,
    marginTop: 20,
  },
});
