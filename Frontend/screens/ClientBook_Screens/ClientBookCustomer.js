import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

import Colors from "../../constants/Colors/Colors";
import Figures from "../../constants/figures/Figures";
import SearchBanner from "../../components/UI/SearchBanner";
import CBToggleButtons from "../../components/ClientBook CBI/ClientBookToggleButtons";
import TableListCB from "../../components/ClientBook CBI/TableListClientBook";

function ClientBookCustomer({ navigation }) {
  const id = 4; //in the future bryan will send me the customer id
  const [openBannerSearch, setOpenBannerSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    Paid: false,
    Pending: false,
    Canceled: false,
    "In Draft": false,
  });

  function updateActiveCategory(category) {
    setActiveCategory(category);
  }

  function updateSearchTerm(term) {
    setSearchTerm(term);
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
              navigation.navigate("ClientBook");
            }}
          />
        </View>

        <Appbar.Content
          title="El KABRON Cliente"
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
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setOpenBannerSearch(!openBannerSearch);
            }}
          />
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
      </View>

      <View style={{ margin: 30 }}>
        <CBToggleButtons
          toggleActiveCategory={updateActiveCategory}
          activeCategory={activeCategory}
        />
      </View>
      <TableListCB activeCategory={activeCategory} searchTerm={searchTerm} />
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
