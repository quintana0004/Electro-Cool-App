import { useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { httpGetAllDeposits } from "../../api/deposits.api";
import { httpGetAllInvoices } from "../../api/invoices.api";

import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

function TableList({ activeCategory, searchTerm, searchLoading, setSearchLoading, filters }) {
  const TAKE = 15;
  const navigation = useNavigation();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["InvoicesHomeData", activeCategory, searchTerm],
    queryFn: getInvoicesHomeScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getInvoicesHomeScreenData({ pageParam = 0 }) {
    let data = null;

    if (activeCategory === "Invoices") {
      console.log("Data Before Request", data);
      data = await httpGetAllInvoices(TAKE, pageParam, searchTerm);
      console.log("Data After Request: ", data);
    } else {
      data = await httpGetAllDeposits(TAKE, pageParam, searchTerm);
    }

    console.log("Is loading state before change: ", searchLoading);
    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return data;
  }

  function getTableData() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }

    const filteredData = filterTableData(tableData);
    return filteredData;
  }

  function filterTableData(tableData) {
    let activeFilters = [];
    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (filterValue) {
        activeFilters.push(filterKey);
      }
    }

    let filteredData = tableData;
    if (activeFilters.length > 0) {
      const activeFilterChecker = (data) => {
        return activeFilters.some((element) => data.status.includes(element));
      };

      filteredData = tableData.filter(activeFilterChecker);
    }

    return filteredData;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function navigateToDetailScreen(itemId) {
    if (activeCategory === "Invoices") {
      navigation.navigate("InvoiceDetail", { itemId });
    } else {
      navigation.navigate("DepositDetail", { itemId });
    }
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.customer.firstName,
      lastName: item.customer.lastName,
      date: item.createdDate,
      amountTotal: item.amountTotal,
      status: item.status,
    };

    return <TableItem itemData={itemInfo} onPress={navigateToDetailScreen} />;
  }

  return (
    <View style={{ height: 670, width: Dimensions.get("screen").width }}>
      <TableHeader />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={renderTableItem}
          estimatedItemSize={10}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 500,
    width: Dimensions.get("screen").width,
  },
});

export default TableList;
