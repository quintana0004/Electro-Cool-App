import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { httpGetAllTasks } from "../../api/tasks.api";
import { httpGetAllInvoices } from "../../api/invoices.api";

import TableItemTasks from "./TableItemTasks";
import TableHeaderCalendar from "./TableHeaderCalendar";

//{ activeCategory, searchTerm, filters }

function TableListTasks({
  activeCategory,
  searchTerm,
  filters,
  searchLoading,
  setSearchLoading,
}) {
  console.log("List");
  const TAKE = 15;
  searchTerm = "2023-06-12T00:00:00.000Z";

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["TasksHomeData", activeCategory, searchTerm],
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
    data = await httpGetAllTasks(TAKE, pageParam, searchTerm);
    console.log("Gabo es cool", data);

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return data;
  }

  function getTableData() {
    console.log("GetData", data);
    let tableData = [];

    for (const items of data.pages.map((p) => p.data).flat()) {
      tableData.push(...items.data);
    }
    console.log("item", tableData);
    return tableData;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function renderTableItem({ item }) {
    console.log("La madre q te pario", item);
    const itemInfo = {
      id: item.id,
      title: item.text,
      date: item.duedate,
    };
    return <TableItemTasks itemData={itemInfo} />;
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

export default TableListTasks;
