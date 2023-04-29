import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  RefreshControl,
} from "react-native";
import { Modal, Button } from "react-native-paper";
import { httpGetAllAppointments } from "../../api/appointments.api";
import TableItemAppointments from "./TableItemAppointments";
import { Agenda } from "react-native-calendars";
import { useCalendarStore } from "../../Store/calendarStore";
import { useQuery } from "@tanstack/react-query";

function TableListAppointments({ searchTerm }) {
  // const TAKE = 15;
  const todaysDate = new Date();
  const minDate = new Date();
  minDate.setMonth(todaysDate.getMonth() - 3); //only present 3 months back from current day(today)
  const maxDate = new Date();
  maxDate.setMonth(todaysDate.getMonth() + 3); // present 3 months forward from current day(today)

  const minDate1 = minDate.toISOString();
  const maxDate1 = maxDate.toISOString();
  const [modalVisible, setModalVisible] = useState(false);

  const reloadCalendarList = useCalendarStore(
    (state) => state.reloadCalendarList
  );

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["CalendarAppointmentsData", reloadCalendarList],
    queryFn: getAllAppointments,
    enabled: true,
  });

  async function getAllAppointments() {
    const response = await httpGetAllAppointments(todaysDate.toJSON());
    const responseData = response.data;

    if (responseData && responseData.length === 0) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }

    return responseData;
  }

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

  function renderEmptyData() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 100,
          paddingTop: 200,
          paddingBottom: 200,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            No Appointments on this day.
          </Text>
        </View>
      </View>
    );
  }
  function renderKnob() {
    return (
      <View>
        <Text>Button</Text>
      </View>
    );
  }

  //Verify the current Month of the Date
  return (
    <View style={styles.listContainer}>
      {isLoading || (
        <Agenda
          items={data}
          renderItem={renderTableItem}
          renderEmptyData={() => {
            return renderEmptyData();
          }}
          minDate={minDate1}
          maxDate={maxDate1}
          hideExtraDays={true}
          theme={{ agendaKnobColor: "#fff" }}
          renderKnob={() => renderKnob()}
          selected={todaysDate.toISOString().slice(0, 10)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    height: 850,
    width: Dimensions.get("screen").width,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
  },
});

export default TableListAppointments;
