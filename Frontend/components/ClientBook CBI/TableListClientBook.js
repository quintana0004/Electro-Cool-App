import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { httpGetAllInvoices } from "../../api/invoices.api";
import { httpGetAllCars } from "../../api/cars.api";
import { httpGetAllClients } from "../../api/clients.api";

import TableHeaderInvoiceCB from "./TableHeaderInvoicesCB";
import InvoiceItemCB from "./InvoiceItemClientBook";
import CustomerItemCB from "./CustomerItemClienBook";
import CarItemCB from "./CarsItemClientBook";

function TableListCB({ activeCategory, searchTerm, filters }) {
  const TAKE = 15;
  console.log("La Puta de BryanX");

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

    if (activeCategory === "Clients") {
      data = await httpGetAllClients(TAKE, pageParam, searchTerm);
    } else if (activeCategory === "Vehicles") {
      data = await httpGetAllCars(TAKE, pageParam, searchTerm);
    } else {
      data = await httpGetAllInvoices(TAKE, pageParam, searchTerm);
    }

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
  //Customer Items
  function renderClientTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      date: item.createdDate,
    };
    return <CustomerItemCB itemData={itemInfo} category={activeCategory} />;
  }

  //Car Items
  function renderCarTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      brand: item.brand,
      model: item.model,
      lecinsePlate: item.lecinsePlate,
      color: item.color,
      year: item.year,
      milage: item.milage,
      vinNumber: item.vinNumber,
      date: item.createdDate,
    };
    return <CarItemCB itemData={itemInfo} category={activeCategory} />;
  }

  //Invoice Items
  function renderInvoiceTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.customer.firstName,
      lastName: item.customer.lastName,
      date: item.createdDate,
      amountTotal: item.amountTotal,
      status: item.status,
    };
    return <InvoiceItemCB itemData={itemInfo} category={activeCategory} />;
  }

  function setColumns() {
    if (activeCategory === "Vehicle") return 2;
    else return 1;
  }
  function renderTableItem() {
    if (activeCategory === "Clients") renderClientTableItem;
    else if (activeCategory === "Vehicle") renderCarTableItem;
    else renderInvoiceTableItem;
  }
  return (
    //put it on an if else statement to look for clients,cars,and invoices
    <View style={{ height: 500, width: Dimensions.get("screen").width }}>
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

export default TableListCB;
