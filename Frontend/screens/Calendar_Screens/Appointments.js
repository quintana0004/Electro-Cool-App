import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
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
              <Text>{item.startTime}</Text>
              <Text>{item.endTime}</Text>
              <Avatar.Text label="A" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
