import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderTasks from "./TableHeaderCTasks";
import TableItemCTasks from "./TableItemCTasks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllTasks } from "../../api/tasks.api";
import { format } from "date-fns";

function cTaskItem(itemData) {
  //console.log("ITEAM DATA: ", itemData);
  return (
    <TableItemCTasks
      id={itemData.item.id}
      text={itemData.item.text}
      dueDate={itemData.item.dueDate}
    />
  );
}

function TableListCTasks({ searchTerm }) {
  const TAKE = 15;
  function DateText() {
    return format(new Date(), "yyyy-MM-dd");
  }

  searchTerm = `${DateText()}T00:00:00.000Z`;
  console.log("dori dori dori dori dori", searchTerm);
  console.log("-----------------------");

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["TasksHomePage", searchTerm],
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
    return data;
  }

  function getTableData() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }
    console.log(tableData);
    return tableData;
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
      <TableHeaderTasks />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={cTaskItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default TableListCTasks;
