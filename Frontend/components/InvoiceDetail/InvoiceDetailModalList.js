import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllDeposits } from "../../api/deposits.api";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import InvoiceDetailModalListItem from "./InvoiceDetailModalListItem";

function InvoiceDetailModalList({ searchTerm, searchLoading, setSearchLoading, onSelectedDeposit, onRemovedDeposit }) {

  const TAKE = 15;

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["SelectDepositModalList", searchTerm],
    queryFn: getDepositItemsData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage ? undefined : lastPage.data.currentPage + 1;
    },
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
  
  async function getDepositItemsData({ pageParam = 0 }) {
    let data = await httpGetAllDeposits(TAKE, pageParam, searchTerm);

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

    return tableData;
  }

  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      amountTotal: item.amountTotal,
      fullName: `${item.customer.lastName}, ${item.customer.firstName}`,
      createdDate: item.createdDate,
    }

    return <InvoiceDetailModalListItem itemData={itemInfo} onSelectedDeposit={onSelectedDeposit} onRemovedDeposit={onRemovedDeposit} />
  }

  return (
    <View style={styles.container}>
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={renderTableItem}
          onEndReached={loadMoreData}
        />)
      }
    </View>
  );
}

export default InvoiceDetailModalList;

const styles = StyleSheet.create({
  container: {
    height: 600,
  }
});
