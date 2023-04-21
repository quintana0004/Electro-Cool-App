import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, View } from "react-native";

import { httpGetAllInvoices } from "../../../../api/invoices.api";
import TableHeaderCB from "./TableHeaderInvoicesCB";
import InvoiceItemClientBook from "./InvoiceItemClientBook";

function InvoiceListCB({
  searchTerm,
  searchLoading,
  setSearchLoading,
  customerID,
}) {
  const TAKE = 15;

  const { isLoading, data, hasNextPage, fetchNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ["InvoicesHomeData", searchTerm],
      queryFn: getInvoicesHomeScreenData,
      getNextPageParam: (lastPage) => {
        return lastPage.data.isLastPage
          ? undefined
          : lastPage.data.currentPage + 1;
      },
      enabled: true,
    });

  async function getInvoicesHomeScreenData({ pageParam = 0 }) {
    let data = null;
    data = await httpGetAllInvoices(TAKE, pageParam, searchTerm);

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return data;
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

  if (isError) {
    console.log("Error Fetching Invoice & Deposit Items: ", error);
    Alert.alert(
      "Error",
      "There was an error fetching the invoice & deposit items. Please try again later."
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
        />
      )}
    </View>
  );
}

export default InvoiceListCB;
