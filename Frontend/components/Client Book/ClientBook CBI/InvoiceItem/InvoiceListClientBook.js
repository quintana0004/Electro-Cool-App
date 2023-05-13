import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, View, Text } from "react-native";

import { httpGetInvoiceByCustomerId } from "../../../../api/invoices.api";
import TableHeaderCB from "./TableHeaderInvoicesCB";
import InvoiceItemClientBook from "./InvoiceItemClientBook";
import { useState } from "react";
import ErrorOverlay from "../../../UI/ErrorOverlay";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import { CBCustomerInfoStore } from "../../../../Store/JobOrderStore";
import { State } from "react-native-gesture-handler";

function InvoiceListCB({
  searchLoading,
  setSearchLoading,
  customerId,
  filters,
}) {
  const TAKE = 15;
  const [errorMessage, setErrorMessage] = useState("");
  const setReloadClientBookInvoice = CBCustomerInfoStore(
    (state) => state.setReloadClientBookInvoice
  );
  const reloadClientBookInvoice = CBCustomerInfoStore(
    (state) => state.reloadClientBookInvoice
  );

  const { isLoading, data, hasNextPage, fetchNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ["InvoicesHomeData", customerId, reloadClientBookInvoice],
      queryFn: getInvoicesHomeScreenData,
      getNextPageParam: (lastPage) => {
        return lastPage.data.isLastPage
          ? undefined
          : lastPage.data.currentPage + 1;
      },
      enabled: true,
    });

  async function getInvoicesHomeScreenData({ pageParam = 0 }) {
    setErrorMessage("Error loading Inovices. Please try again later.");
    let data = await httpGetInvoiceByCustomerId(TAKE, pageParam, customerId);

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

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
  function ErrorHandler() {
    setErrorMessage(null);
    setReloadClientBookInvoice();
  }
  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.customer.firstName,
      lastName: item.customer.lastName,
      date: item.createdDate,
      amountTotal: item.amountTotal,
      status: item.status,
    };

    return <InvoiceItemClientBook itemData={itemInfo} />;
  }

  if (isLoading) {
    return (
      <View style={{ height: 600 }}>
        <LoadingOverlay />
      </View>
    );
  }

  if (isError) {
    console.log("CB Invoice Error:", errorMessage);
    return <ErrorOverlay message={errorMessage} onConfirm={ErrorHandler} />;
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
            No Invoice Created.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ height: 670, width: Dimensions.get("screen").width }}>
      <TableHeaderCB />
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={renderTableItem}
          estimatedItemSize={10}
          onEndReached={loadMoreData}
          ListEmptyComponent={() => {
            return renderEmptyData();
          }}
        />
      )}
    </View>
  );
}

export default InvoiceListCB;
