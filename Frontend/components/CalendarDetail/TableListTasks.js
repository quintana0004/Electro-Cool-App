import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderTasks from "./TableHeaderTasks";
import TableItemTasks from "./TableItemTasks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllTasks } from "../../api/tasks.api";
import { format } from "date-fns";

function taskItem(itemData) {
  console.log("ITEAM DATA: ", itemData);
  return (
    <TableItemTasks
      id={itemData.item.id}
      text={itemData.item.text}
      date={itemData.item.dueDate}
    />
  );
}

function TableListTasks({ searchTerm }) {
  const TAKE = 15;
  function DateText() {
    return format(new Date(), "yyyy-MM-dd");
  }

  searchTerm = `${DateText()}T00:00:00.000Z`;
  console.log("dori dori dori dori dori", searchTerm);

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["CalendarHomePage", searchTerm],
    queryFn: getTasksScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getTasksScreenData({ pageParam = 0 }) {
    let data = await httpGetAllTasks(TAKE, pageParam, searchTerm);
    console.log("DATA : ", data.data);
    return data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function getTableData() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }

    return tableData;
  }

  return (
    <View
      style={{
        height: 850,
        width: Dimensions.get("screen").width,
      }}
    >
      <TableHeaderTasks />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={taskItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default TableListTasks;
