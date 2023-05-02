import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Alert } from "react-native";
import { httpGetAllAppointments } from "../../api/appointments.api";
import TableItemAppointments from "./TableItemAppointments";
import { Agenda } from "react-native-calendars";
import { useCalendarStore } from "../../Store/calendarStore";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors/Colors";
import ErrorOverlay_Shelly from "../UI/ErrorOVerlay_Shelly";
import LoadingOverlay from "../UI/LoadingOverlay";

function TableListAppointments({ searchTerm }) {
  // const TAKE = 15;
  // ONLY SHOW DAYS FORWARD AND THE MIN DATE SEA HOY
  const [errorMessage, setErrorMessage] = useState("");
  const todaysDate = new Date();
  const minDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth(),
    todaysDate.getDate()
  );
  const maxDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth() + 3,
    todaysDate.getDate()
  );
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
    setErrorMessage("Error loading Appointments. Please try again later.");

    //  const response = await httpGetAllAppointments(todaysDate.toJSON());
    const response = await httpGetAllAppointments("Saludos");
    const responseData = response.data;

    if (responseData && responseData.length === 0) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }

    return responseData;
  }
  function errorHandler() {
    setErrorMessage(null);
  }
  if (isError) {
    return (
      <ErrorOverlay_Shelly message={errorMessage} onConfirm={errorHandler} />
    );
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  function renderTableItem(item) {
    //Function to render data onto agenda
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
            No Appointments on this day.
          </Text>
        </View>
      </View>
    );
  }
  function renderKnob() {
    //Icon for the Agenda Dropdown
    return (
      <View>
        <Icon name="chevron-down" size={20} color="black" />
      </View>
    );
  }

  const markedDates = {};
  for (let d = new Date(minDate); d <= todaysDate; d.setDate(d.getDate() + 1)) {
    markedDates[d.toISOString().slice(0, 10)] = { disabled: true };
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
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            selectedDayBackgroundColor: Colors.brightGreen,
            agendaDayTextColor: Colors.white,
            agendaDayNumColor: Colors.white,
            agendaTodayColor: Colors.black,
            selectedDayTextColor: Colors.white,
          }}
          renderKnob={() => renderKnob()}
          selected={todaysDate.toISOString().slice(0, 10)}
          markedDates={markedDates}
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
