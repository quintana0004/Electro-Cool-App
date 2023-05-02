import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderClient from "./TableHeaderClient";
import TableItemClient from "./TableItemClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "../../../api/clients.api";
import { CBCustomerInfoStore } from "../../../Store/JobOrderStore";
import ErrorOverlay from "../../UI/ErrorOverlay";

function TableListClient({ setSearchLoading, searchTerm, searchLoading }) {
  const TAKE = 15;
  const reloadClientBookList = CBCustomerInfoStore(
    (state) => state.reloadClientBookList
  );
  const { isLoading, data, hasNextPage, fetchNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ["ClientBookHomePage", searchTerm, reloadClientBookList],
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

  if (isError) {
    console.log("LaPuta", error.response.data);
    return <ErrorOverlay />;
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
