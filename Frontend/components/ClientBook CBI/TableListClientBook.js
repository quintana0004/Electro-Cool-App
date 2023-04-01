import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { httpGetAllInvoices } from "../../api/invoices.api";
import { httpGetAllCars } from "../../api/cars.api";
import { httpGetAllClients } from "../../api/clients.api";
import TableHeaderInvoiceCB from "./TableHeaderInvoicesCB";
import InvoiceItemCB from "./InvoiceItemClientBook";
import CustomerItemCB from "./CustomerItemClienBook";
import CarItemCB from "./CarsItemClientBook";

function TableListCB({ activeCategory, searchTerm }) {
  const TAKE = 15;

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["ClientBookHomeData", activeCategory, searchTerm],
    queryFn: getClientBookHomeScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getClientBookHomeScreenData({ pageParam = 0 }) {
    let data = null;

    data = await httpGetAllCars(TAKE, pageParam, searchTerm);
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

  //Car Items
  function renderCarTableItem({ item }) {
    const itemInfo = {
      ID: item.id,
      brand: item.brand,
      model: item.model,
      licensePlate: item.licensePlate,
      color: item.color,
      year: item.year,
      mileage: item.mileage,
      vinNumber: item.vinNumber,
      date: item.createdDate,
    };
    return <CarItemCB itemData={itemInfo} />;
  }

  return (
    //put it on an if else statement to look for clients,cars,and invoices
    <View style={styles.listContainer}>
      {isLoading || (
        <FlatList
          data={getTableData()}
          renderItem={renderCarTableItem}
          onEndReached={loadMoreData}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    height: 713,
  },
});

export default TableListCB;
