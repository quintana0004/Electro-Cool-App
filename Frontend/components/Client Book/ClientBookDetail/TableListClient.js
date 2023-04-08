import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderClient from "./TableHeaderClient";
import TableItemClient from "./TableItemClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "../../../api/clients.api";

function clientBookItem(itemData) {
  return (
    <TableItemClient
      id={itemData.item.id}
      date={itemData.item.createdDate}
      firstName={itemData.item.firstName}
      lastName={itemData.item.lastName}
      phone={itemData.item.phone}
      email={itemData.item.email}
    />
  );
}

function TableListClient({ setSearchLoading, searchTerm, searchLoading }) {
  const TAKE = 15;

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["ClientBookHomePage", searchTerm],
    queryFn: getClientBookScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getClientBookScreenData({ pageParam = 0 }) {
    let data = await httpGetAllClients(TAKE, pageParam, searchTerm);
    if (searchLoading) {
      setSearchLoading(false);
    }
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
      <TableHeaderClient />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={clientBookItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default TableListClient;
