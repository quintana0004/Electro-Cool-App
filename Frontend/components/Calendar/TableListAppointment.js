import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { httpGetAllAppointments } from "../../api/appointments.api";
import { httpGetAllTasks } from "../../api/tasks.api";

import TableItem from "./TableItem";
import TableHeaderCalendar from "./TableHeaderCalendar";

function TableListAppointment({ activeCategory, searchTerm, filters }) {
  const TAKE = 15;
  console.log("LOAD MOTHERFUCKER");

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["HomeData", activeCategory, searchTerm],
    queryFn: getHomeScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getHomeScreenData({ pageParam = 0 }) {
    let data = null;
    if (activeCategory === "Appointments") {
      data = await httpGetAllAppointments(TAKE, pageParam, searchTerm);
    } else {
      data = await httpGetAllTasks(TAKE, pageParam, searchTerm);
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

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      title: item.title,

      date: item.date,
      time: item.time,
      status: item.status,
    };
    return <TableItem itemData={itemInfo} category={activeCategory} />;
  }

  return (
    <View style={{ height: 500, width: Dimensions.get("screen").width }}>
      <TableHeaderCalendar />
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

export default TableListAppointment;
