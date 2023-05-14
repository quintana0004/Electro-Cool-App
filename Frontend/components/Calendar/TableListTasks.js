import React from "react";
import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { httpGetAllTasks } from "../../api/tasks.api";
import { useCalendarStore } from "../../Store/calendarStore";

import TableItemTasks from "./TableItemTasks";
import TableHeaderCalendar from "./TableHeaderCalendar";
import LoadingOverlay from "../UI/LoadingOverlay";

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
    return tableData;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }
  if (isLoading) {
    return (
      <View style={{ paddingVertical: 370 }}>
        <LoadingOverlay />
      </View>
    );
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      title: item.text,
      date: item.dueDate,
    };
    return <TableItemTasks itemData={itemInfo} onDelete={handleRefresh} />;
  }
  function renderEmptyData() {
    // If there are no tasks on the day, show this message
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 600,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
          }}
        >
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            Currently, there are no Tasks.
          </Text>
        </View>
      </View>
    );
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
          ListEmptyComponent={renderEmptyData}
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
