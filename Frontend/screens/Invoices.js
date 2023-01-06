import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import TableList from "../components/Invoices/TableList";
import ToggleButtons from "../components/Invoices/ToggleButtons";
import MenuDropDown from "../components/Navigation/MenuDropDown";
import ActionBtn from "../components/UI/ActionBtn";
import FilterBtn from "../components/UI/FilterBtn";
import Header from "../components/UI/Header";
import Colors from "../constants/Colors/Colors";
import Figures from "../constants/figures/Figures";

import { httpGetAllInvoices } from "../api/invoices.api";
import { httpGetAllDeposits } from "../api/deposits.api";

function Invoices({ navigation }) {
  const TAKE = 15;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Invoices");

  async function navigateToFindExistingClientScreen() {
    navigation.navigate("ExistingClients");
  }

  async function getInvoicesHomeScreenData({ pageParam = 0 }) {
    let skip = pageParam * TAKE;
    let data = null;
    if (activeCategory === "Invoices") {
      data = await httpGetAllInvoices(TAKE, skip, searchTerm);
    } else {
      data = await httpGetAllDeposits(TAKE, skip, searchTerm);
    }

    return data;
  }

  const { isLoading, data, error, isError, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["InvoicesHomeData"],
    getInvoicesHomeScreenData,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage !== null) {
          return lastPage.next;
        }

        return lastPage;
      },
    }
  );

  if (isLoading) {
    return (
      <View>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>I AM LOADING</Text>
      </View>
    );
  }

  return (
    <View>
      <Header divideH={6} divideW={1} colorHeader={Colors.darkBlack}>
        <MenuDropDown />
      </Header>
      <View style={styles.body}>
        <View style={styles.actionButtonGroup}>
          <ActionBtn onPress={navigateToFindExistingClientScreen}>Create Deposit</ActionBtn>

          <View style={styles.actionRightButtonGroup}>
            <FilterBtn image={Figures.FilterIcon} />
            <ActionBtn onPress={navigateToFindExistingClientScreen}>Create Invoice</ActionBtn>
          </View>
        </View>

        <View>
          <ToggleButtons toggleActiveCategory={setActiveCategory} />
        </View>

        <TableList tableData={data.pages.map((p) => p.data).flat()} />
      </View>
    </View>
  );
}

export default Invoices;

const styles = StyleSheet.create({
  body: {
    marginTop: 180,
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
});
