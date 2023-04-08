import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllAppointments } from "../../api/appointments.api";
import TableItemAppointments from "./TableItemAppointments";
import { Agenda } from "react-native-calendars";
function TableListAppointments({
  activeCategory,
  searchTerm,
  searchLoading,
  setSearchLoading,
}) {
  console.log("List");
  const TAKE = 15;
  searchTerm = "2022-02-25T10:31:00.000Z";

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["AppointmentsHomeData", activeCategory, searchTerm],
    queryFn: getAppointmentsHomeScreenData,
    getNextPageParam: (lastPage) => {
      return lastPage.data.isLastPage
        ? undefined
        : lastPage.data.currentPage + 1;
    },
    enabled: true,
  });

  async function getAppointmentsHomeScreenData({ pageParam = 0 }) {
    let data = null;
    data = await httpGetAllAppointments(TAKE, pageParam, searchTerm);
    console.log("Gabo es cool", data);

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
    console.log("Data:", item);
    const itemInfo = {
      id: item.id,
      customername: item.customername,
      arrivalDateTime: item.arrivalDateTime,
      service: item.service,
      brand: item.brand,
      licensePlate: item.licensePlate,
    };
    return <TableItemAppointments itemData={itemInfo} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={agendaItems}
        onDayPress={(day) => {
          console.log("Day pressed:", day.dateString);
          fetchData(day.dateString);
        }}
        renderItem={(item) => {
          console.log("Item:", item);
          return <TableItemAppointments item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 500,
    width: Dimensions.get("screen").width,
  },
});

export default TableListAppointments;
