import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableItemAppointment from "./TableItemAppointment";
import TableListAppointment from "./TableListAppointment";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllAppointments } from "../../api/appointments.api";

function appointmentsItem(itemData) {
  console.log("ITEAM DATA: ", itemData);
  return (
    <TableItemAppointment
      ID={itemData.item.id}
      date={itemData.item.createdDate}
      firstName={itemData.item.customer.firstName}
      lastName={itemData.item.customer.lastName}
      status={itemData.item.status}
    />
  );
}

function TableListAppointment({
  setSearchLoading,
  searchTerm,
  searchLoading,
  filters,
}) {
  const TAKE = 15;
  console.log("Testing appointments");

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["CalendarHomePage", searchTerm],
    queryFn: getAppointmentScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getAppointmentScreenData({ pageParam = 0 }) {
    let data = await httpGetAllAppointments(TAKE, pageParam, searchTerm);
    if (searchLoading) {
      setSearchLoading(false);
    }
    console.log("DATA : ", data.data);
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
          renderItem={appointmentsItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default TableListOrder;
