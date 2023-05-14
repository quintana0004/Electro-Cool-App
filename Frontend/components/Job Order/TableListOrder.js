import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderOrder from "./TableHeaderOrder";
import TableItemOrder from "./TableItemOrder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllJobOrders } from "../../api/jobOrders.api";
import { useJobOrderStore } from "../../Store/JobOrderStore";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function jobOrderItem(itemData) {
  const item = itemData.item;
  return (
    <TableItemOrder
      ID={item.id}
      firstName={item.customer.firstName}
      lastName={item.customer.lastName}
      date={item.createdDate}
      status={item.status}
      carId={item.carId}
      customerId={item.customerId}
    />
  );
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

  const setReloadJobOrderList = useJobOrderStore(
    (state) => state.setReloadJobOrderList
  );

  const { isLoading, data, hasNextPage, fetchNextPage, isError } =
    useInfiniteQuery({
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
        return activeFilters.some(
          (element) =>
            data.status.includes(element) || data.jobLoadType.includes(element)
        );
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

  if (isLoading) {
    return (
      <View style={{ marginTop: 350 }}>
        <LoadingOverlay />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ marginTop: 150 }}>
        <ErrorOverlay
          message={"There was an error on server, try again."}
          onConfirm={setReloadJobOrderList}
        />
      </View>
    );
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
