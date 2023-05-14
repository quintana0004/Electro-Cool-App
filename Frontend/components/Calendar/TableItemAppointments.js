import { StyleSheet, Text, ToastAndroid, View, Pressable } from "react-native";
import { format } from "date-fns";
import { Appbar, Card } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { httpDeleteAppointment } from "../../api/appointments.api";
import { useCalendarStore } from "../../Store/calendarStore";
import { Entypo } from "@expo/vector-icons";

function TableItemAppointments({ itemData }) {
  const { id, customername, arrivalDateTime, service, brand, licensePlate } =
    itemData;

  const setReloadCalendarList = useCalendarStore(
    (state) => state.setReloadCalendarList
  );

  function DateText() {
    return format(new Date(arrivalDateTime), "h:mm a");
  }

  function showSuccessMessage() {
    ToastAndroid.show("Appointment Completed!", ToastAndroid.SHORT);
  }

  function showFailedMessage() {
    ToastAndroid.show("Try Again, there was a problem!", ToastAndroid.SHORT);
  }

  async function handleConfirmORDeleteApp() {
    try {
      const dataApp = await httpDeleteAppointment(id);
      setReloadCalendarList();
      showSuccessMessage();
    } catch (error) {
      showFailedMessage();
    }
  }
  const formattedCustomerName = customername
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <View>
      <Card
        style={{
          marginTop: 15,
          marginBottom: 10,
          width: 515,
          borderColor: Colors.white,
          borderWidth: 12,
          backgroundColor: Colors.white,
        }}
      >
        <Card.Content>
          <View style={styles.cardContentContainer}>
            <View style={styles.serviceContainer}>
              <View style={{ width: 160 }}>
                <Text style={styles.boldText}>{formattedCustomerName}</Text>
                <Text style={styles.boldText}>{DateText()}</Text>
              </View>
            </View>
            <View style={styles.serviceContainer}>
              <View style={{ width: 220 }}>
                <View style={{ paddingBottom: 5 }}>
                  <Text style={styles.boldText}>
                    <Text style={styles.underline}>Service</Text>: {service}
                  </Text>
                </View>
                <View>
                  <Text style={styles.boldText}>
                    <Text style={styles.underline}>Car</Text>: {brand}-
                    {licensePlate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Appbar.Action
                color="#138A8C"
                icon="check-circle"
                onPress={async () => handleConfirmORDeleteApp()}
              />
              <Pressable
                onPress={handleConfirmORDeleteApp}
                style={{
                  borderRadius: 50,
                }}
              >
                <View style={{ top: 12 }}>
                  <Entypo name="trash" size={24} color="black" />
                </View>
              </Pressable>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default TableItemAppointments;

const styles = StyleSheet.create({
  cardContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  serviceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
