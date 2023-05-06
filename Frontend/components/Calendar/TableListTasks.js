import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { httpGetAllTasks } from "../../api/tasks.api";
import { useCalendarStore } from "../../Store/calendarStore";

import TableItemTasks from "./TableItemTasks";
import TableHeaderCalendar from "./TableHeaderCalendar";

function TableListTasks({ activeCategory, searchLoading, setSearchLoading }) {
  const TAKE = 15;

  const queryClient = useQueryClient();
  const reloadCalendarList = useCalendarStore(
    (state) => state.reloadCalendarList
  );
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["TasksHomeData", activeCategory, reloadCalendarList],
    queryFn: getTasksHomeScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getTasksHomeScreenData({ pageParam = 0 }) {
    let data = null;
    data = await httpGetAllTasks(TAKE, pageParam);

    if (searchLoading) setSearchLoading(false);

    return data;
  }

  function handleRefresh() {
    queryClient.invalidateQueries(["TasksHomeData", activeCategory]);
  }

  function getTableData() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }
    console.log("TESTING", tableData);
    return tableData;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      title: item.text,
      date: item.dueDate,
    };
    return <TableItemTasks itemData={itemInfo} onDelete={handleRefresh} />;
  }

  return (
    <View style={styles.listContainer}>
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
    height: 840,
    width: Dimensions.get("screen").width,
  },
});

export default TableListTasks;
