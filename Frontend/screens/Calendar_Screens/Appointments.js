import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Agenda } from "react-native-calendars";
import { httpGetAllAppointments } from "../../api/appointments.api";

const Appointments = () => {
  const [agendaItems, setAgendaItems] = useState({});

  const processAppointments = (appointments) => {
    const groupedAppointments = appointments.reduce((acc, appointment) => {
      const dateObject = new Date(appointment.arrivalDateTime);
      const date = dateObject.toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(appointment);
      return acc;
    }, {});

    return groupedAppointments;
  };
  const fetchData = async (selectedDate) => {
    try {
      const dateObject = new Date(selectedDate);
      dateObject.setHours(23, 59, 59, 999); // Set the time
      const isoDate = dateObject.toISOString();
      console.log("Cago en to", isoDate);

      const response = await httpGetAllAppointments(5, 0, isoDate);
      const appointments = response.data;
      const groupedAppointments = processAppointments(appointments);

      setAgendaItems(groupedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  // Set the initial date to today or any other date you prefer
  const initialDate = new Date().toISOString().split("T")[0];

  // Call fetchData with the initial date when the component mounts
  useEffect(() => {
    fetchData(initialDate);
  }, []);

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
};

export default Appointments;
