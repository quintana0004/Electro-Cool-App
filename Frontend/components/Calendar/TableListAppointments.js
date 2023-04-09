import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetAllAppointments } from "../../api/appointments.api";
import TableItemAppointments from "./TableItemAppointments";
import { Agenda } from "react-native-calendars";
import { AppointmentsData } from "../../constants/Dummy_Data/AppointmentsData";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { useCalendarStore } from "../../Store/calendarStore";

function TableListAppointments({
  activeCategory,
  searchTerm,
  searchLoading,
  setSearchLoading,
}) {
  // console.log("List");
  // const TAKE = 15;
  searchTerm = "2023-04-08T10:51:00.000Z"; //JESSICA COMMENT: Make sure to place the actual date that the user is, this is hard coded, change later
  minDate1 = "2023-04-08T10:51:00.000Z";
  maxDate1 = "2023-06-08T10:51:00.000Z";

  // const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
  //   queryKey: ["AppointmentsHomeData", activeCategory, searchTerm],
  //   queryFn: getAppointmentsHomeScreenData,
  //   getNextPageParam: (lastPage) => {
  //     return lastPage.data.isLastPage
  //       ? undefined
  //       : lastPage.data.currentPage + 1;
  //   },
  //   enabled: true,
  // });

  // async function getAppointmentsHomeScreenData({ pageParam = 0 }) {
  //   let data = null;
  //   data = await httpGetAllAppointments(TAKE, pageParam, searchTerm);
  //   console.log("Gabo es cool", data);

  //   if (searchLoading) setSearchLoading(false);

  //   return data;
  // }

  // function getTableData() {
  //   console.log("GetData", data);
  //   let tableData = [];

  //   for (const items of data.pages.map((p) => p.data).flat()) {
  //     tableData.push(...items.data);
  //   }
  //   console.log("item", tableData);
  //   return tableData;
  // }

  // function loadMoreData() {
  //   if (hasNextPage) {
  //     fetchNextPage();
  //   }
  // }

  const reloadCalendarList = useCalendarStore(
    (state) => state.reloadCalendarList
  );

  useEffect(() => {
    async function getAppointment() {
      try {
        const appointmentData = await httpGetAllAppointments(15, 0, searchTerm);
        console.log("DATA APPOINTMENT:  ", appointmentData.data);
        setAppData(appointmentData.data);
      } catch (error) {
        console.log("ERROR APPOINTMENT: ", error);
      }
    }

    getAppointment();
  }, [activeCategory, reloadCalendarList]);

  const [appData, setAppData] = useState();

  function renderTableItem(item) {
    console.log("TABLE ITEM DATA ((HERE)): ", item);
    const itemInfo = {
      id: item.id,
      customername: item.customerName,
      arrivalDateTime: item.arrivalDateTime,
      service: item.service,
      brand: item.brand,
      licensePlate: item.licensePlate,
    };
    return <TableItemAppointments itemData={itemInfo} />;
  }

  //Verify the current Month of the Date
  return (
    <View style={styles.listContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Agenda
          items={appData}
          renderItem={renderTableItem}
          minDate={minDate1}
          maxDate={maxDate1}
          hideExtraDays={true}
          theme={{ agendaKnobColor: "#fff" }}
          style={{ backgroundColor: "#fff" }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 850,
    width: Dimensions.get("screen").width,
  },
});

export default TableListAppointments;
