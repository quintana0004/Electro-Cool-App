import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView } from "react-native";

import { httpGetAllAppointments } from "../../api/appointments.api";
import TableItemAppointments from "./TableItemAppointments";
import { Agenda } from "react-native-calendars";
import { useCalendarStore } from "../../Store/calendarStore";

function TableListAppointments({ activeCategory, searchTerm }) {
  // const TAKE = 15;
  const todaysDate = new Date();
  const minDate1 = "2023-04-08T10:51:00.000Z";
  const maxDate1 = "2023-06-08T10:51:00.000Z";

  // How Mike Implemented It
  // const searchDate = new Date(searchTerm);
  // const EODtime = new Date(searchDate);
  // EODtime.setMonth(EODtime.getMonth() + 2);
  // EODtime.setHours(23, 59, 59, 999);

  const reloadCalendarList = useCalendarStore(
    (state) => state.reloadCalendarList
  );

  useEffect(() => {
    async function getAppointment() {
      try {
        const appointmentData = await httpGetAllAppointments(
          todaysDate.toJSON()
        );
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
