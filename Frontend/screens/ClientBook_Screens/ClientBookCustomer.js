import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Appbar } from "react-native-paper";

import Colors from "../../constants/Colors/Colors";
import SearchBanner from "../../components/UI/SearchBanner";
import CBToggleButtons from "../../components/Client Book/ClientBook CBI/ClientBookToggleButtons";
import CarList from "../../components/Client Book/ClientBook CBI/CarItem/TableListCarCB";
import CustomerItemCB from "../../components/Client Book/ClientBook CBI/CustomerItem/CustomerItemClienBook";
import InvoiceListCB from "../../components/Client Book/ClientBook CBI/InvoiceItem/InvoiceListClientBook";
import { CBCustomerInfoStore } from "../../Store/JobOrderStore";
import { StackActions } from "@react-navigation/native";
import FilterBanner from "../../components/UI/FilterBanner";
import { useVehicleInfoStore } from "../../Store/JobOrderStore";
function ClientBookCustomer({ navigation }) {
  const client = CBCustomerInfoStore((state) => {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      date: state.date,
    };
  });

  const resetVehicleInfo = useVehicleInfoStore(
    (state) => state.resetVehicleInformation
  );

  const cutomerId = client.id;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIcon, setSearchIcon] = useState(true);
  const [openBannerSearch, setOpenBannerSearch] = useState(false);
  const [openBannerFilter, setOpenBannerFilter] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Clients");
  const [fullName, setFullName] = useState(
    client.firstName + " " + client.lastName
  );

  const [filters, setFilters] = useState({
    Paid: false,
    Pending: false,
    Canceled: false,
    InDraft: false,
  });

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  function ToggleScreens(Category) {
    if (Category === "Clients") {
      return <CustomerItemCB onUpdateFullName={updateFullName} />;
    } else if (Category === "Vehicles") {
      return (
        <CarList
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
          searchTerm={searchTerm}
          customerId={cutomerId}
          setSearchIcon={setSearchIcon}
        />
      );
    } else {
      return (
        <InvoiceListCB
          searchLoading={searchLoading}
          setSearchLoading={setSearchLoading}
          customerId={cutomerId}
          filters={filters}
        />
      );
    }
  }
  function updateFullName(firstName, lastName) {
    setFullName(firstName + " " + lastName);
  }

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            flex: 1,
            zIndex: 1,
          }}
        >
          <Appbar.Action
            icon="arrow-left"
            onPress={() => {
              const pageAction = StackActions.popToTop();
              navigation.dispatch(pageAction);
              resetVehicleInfo();
            }}
          />
        </View>

        <Appbar.Content
          title={fullName}
          color={Colors.brightYellow}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          titleStyle={{
            fontWeight: "500",
            fontSize: 28,
            textAlign: "center",
            width: 300,
          }}
        />

        <View
          style={{ justifyContent: "flex-end", flexDirection: "row", flex: 1 }}
        >
          {activeCategory == "Vehicles" && searchIcon && (
            <Appbar.Action
              icon="magnify"
              onPress={() => {
                setOpenBannerSearch(!openBannerSearch);
                setOpenBannerFilter(false);
              }}
            />
          )}
          {activeCategory == "Invoices" && (
            <Appbar.Action
              icon="filter"
              onPress={() => {
                setOpenBannerFilter(!openBannerFilter);
                setOpenBannerSearch(false);
              }}
            />
          )}
        </View>
      </Appbar.Header>
      <View>
        <SearchBanner
          visible={openBannerSearch}
          loading={searchLoading}
          placeholder={"Search by License Plate"}
          setLoading={setSearchLoading}
          setSearchTerm={updateSearchTerm}
        />
        <FilterBanner
          visible={openBannerFilter}
          filters={filters}
          updateFilters={setFilters}
        />
      </View>

      <View style={{ margin: 30 }}>
        <CBToggleButtons
          toggleActiveCategory={updateActiveCategory}
          activeCategory={activeCategory}
        />
      </View>

      <View>{ToggleScreens(activeCategory)}</View>
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
  header: {
    flexDirection: "row",
    backgroundColor: Colors.darkBlack,
    zIndex: -1,
  },
  title: {
    fontWeight: 600,
  },
});

export default ClientBookCustomer;
