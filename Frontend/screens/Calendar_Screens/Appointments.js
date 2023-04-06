import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import CalendarData from "../../constants/Dummy_Data/AppointmentsData";

const App = () => {
  const [items, setItems] = React.useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = {};

      CalendarData.forEach((entry) => {
        const date = entry.date;
        const appointments = entry.appointments;

        newItems[date] = appointments.map((appointment) => {
          const startTime = formatLocaleDateTime(appointment.startTime);
          const endTime = formatLocaleDateTime(appointment.endTime);
          return {
            ...appointment,
            day: date,
            startTime,
            endTime,
          };
        });
      });

      setItems(newItems);
    }, 1000);
  };
  const formatLocaleDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderItem = (item) => {
    const startComponents = item.startTime.substring(1).split(":");
    const startHours = parseInt(startComponents[0]);
    const startMinutes = parseInt(startComponents[1]);
    const startDate = new Date(0, 0, 0, startHours, startMinutes);

    const endComponents = item.endTime.substring(1).split(":");
    const endHours = parseInt(endComponents[0]);
    const endMinutes = parseInt(endComponents[1]);
    const endDate = new Date(0, 0, 0, endHours, endMinutes);
    return (
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Text>{Array.from(startDate)[3]}</Text>
              <Text>{formatLocaleDateTime(endDate)}</Text>

              <Avatar.Text label="A" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        showOnlySelectedDayItems={true}
        theme={{
          dotColor: "#E5B126",
        }}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 2,
    padding: 11,
    marginRight: 10,
    marginTop: 17,
  },
});

export default App;
