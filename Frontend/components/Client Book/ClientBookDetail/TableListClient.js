import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import TableHeaderClient from "./TableHeaderClient";
import TableItemClient from "./TableItemClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "../../../api/clients.api";
import { CBCustomerInfoStore } from "../../../Store/JobOrderStore";
import ErrorOverlay from "../../UI/ErrorOverlay";
import LoadingOverlay from "../../UI/LoadingOverlay";
import { useState } from "react";

function TableListClient({ setSearchLoading, searchTerm, searchLoading }) {
  const TAKE = 15;
  const [errorMessage, setErrorMessage] = useState("");
  const reloadClientBookList = CBCustomerInfoStore(
    (state) => state.reloadClientBookList
  );
  const setReloadClientBookList = CBCustomerInfoStore(
    (state) => state.setReloadClientBookList
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
    setErrorMessage("Error loading Clients. Please try again later.");
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

  function errorHandler() {
    setErrorMessage(null);
    setReloadClientBookList();
  }
  if (isLoading) {
    return (
      <View style={{ height: 800 }}>
        <LoadingOverlay />
      </View>
    );
  }
  if (isError) {
    console.log("Error Message:", error.response.data.error.erroMessage);

    return (
      <View style={{}}>
        <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />
      </View>
    );
  }

  function renderEmptyData() {
    // If there are no appointments on the day, show this message
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
            No Clients Stored.
          </Text>
        </View>
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
      <TableHeaderClient />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={clientBookItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreData}
          ListEmptyComponent={() => {
            return renderEmptyData();
          }}
        />
      )}
    </View>
  );
}

export default TableListClient;
