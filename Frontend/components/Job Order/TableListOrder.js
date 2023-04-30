import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderOrder from "./TableHeaderOrder";
import TableItemOrder from "./TableItemOrder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllJobOrders } from "../../api/jobOrders.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";

function jobOrderItem(itemData) {
  return <TableItemOrder data={itemData.item} />;
}

function TableListOrder({
  setSearchLoading,
  searchTerm,
  searchLoading,
  filters,
}) {
  const TAKE = 15;
  const reloadJobOrderList = useJobOrderStore(
    (state) => state.reloadJobOrderList
  );

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["JobOrderHomePage", searchTerm, reloadJobOrderList],
    queryFn: getJobOrderScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getJobOrderScreenData({ pageParam = 0 }) {
    let data = await httpGetAllJobOrders(TAKE, pageParam, searchTerm);

    if (searchLoading) {
      setSearchLoading(false);
    }

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

  return (
    <View
      style={{
        height: 850,
        width: Dimensions.get("screen").width,
      }}
    >
      <TableHeaderOrder />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={jobOrderItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default TableListOrder;
