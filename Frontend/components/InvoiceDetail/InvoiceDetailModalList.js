import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllAvailableDeposits } from "../../api/deposits.api";
import { Alert, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import InvoiceDetailModalListItem from "./InvoiceDetailModalListItem";
import { useInvoiceStore } from "../../Store/invoiceStore";
import { useCustomerInfoStore } from "../../Store/JobOrderStore";

function InvoiceDetailModalList({
  searchTerm,
  searchLoading,
  setSearchLoading,
  onSelectedDeposit,
  onRemovedDeposit,
  isSortAscending,
}) {
  const TAKE = 15;
  const reloadInvoiceList = useInvoiceStore((state) => state.reloadInvoiceList);
  const customerId = useCustomerInfoStore((state) => state.id);

  const { isLoading, data, fetchNextPage, hasNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: [
        "SelectDepositModalList",
        searchTerm,
        reloadInvoiceList,
        customerId,
      ],
      queryFn: getDepositItemsData,
      getNextPageParam: (lastPage) => {
        return lastPage.data.isLastPage
          ? undefined
          : lastPage.data.currentPage + 1;
      },
      enabled: true,
      staleTime: 1000 * 60 * 30, // 30 minutes
    });

  async function getDepositItemsData({ pageParam = 0 }) {
    let data = await httpGetAllAvailableDeposits(
      TAKE,
      pageParam,
      searchTerm,
      customerId
    );

    // After data is returned, stop search loading if it was active
    if (searchLoading) setSearchLoading(false);

    return data;
  }

  function loadMoreData() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function getTableData() {
    let tableData = [];

    for (const items of data.pages.map((p) => p.data)) {
      tableData.push(...items.data);
    }

    let sortedData = sortTableData(tableData);

    return sortedData;
  }

  function sortTableData(data) {
    let sortedData = [];

    if (isSortAscending) {
      sortedData = data.sort((a, b) =>
        a.customer.firstName.localeCompare(b.customer.firstName)
      );
    } else {
      sortedData = data.sort((a, b) =>
        b.customer.firstName.localeCompare(a.customer.firstName)
      );
    }

    return sortedData;
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      amountTotal: item.amountTotal,
      fullName: `${item.customer.lastName}, ${item.customer.firstName}`,
      createdDate: item.createdDate,
    };

    return (
      <InvoiceDetailModalListItem
        itemData={itemInfo}
        onSelectedDeposit={onSelectedDeposit}
        onRemovedDeposit={onRemovedDeposit}
      />
    );
  }

  if (isError) {
    Alert.alert(
      "Error",
      "There was an error fetching the deposits for selection. Please try again later."
    );
  }

  return (
    <View style={styles.container}>
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={renderTableItem}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
}

export default InvoiceDetailModalList;

const styles = StyleSheet.create({
  container: {
    height: 600,
  },
});
