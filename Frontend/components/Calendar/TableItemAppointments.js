import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { format } from "date-fns";
import { Appbar, Card } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { httpDeleteAppointment } from "../../api/appointments.api";
import { useCalendarStore } from "../../Store/calendarStore";

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
    ToastAndroid.show("Saved Successfully!", ToastAndroid.SHORT);
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

  return (
    <View>
      {/* <Pressable onPress={() => console.log("PRESSED ITEM")}> */}
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
                <Text style={styles.boldText}>{customername}</Text>
                <Text style={styles.boldText}>{DateText()}</Text>
              </View>
            </View>
            <View style={styles.serviceContainer}>
              <View style={{ width: 160 }}>
                <Text style={styles.boldText}>{service}</Text>
                <Text style={styles.boldText}>
                  {brand} {licensePlate}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Appbar.Action
                color="#138A8C"
                icon="check-circle"
                onPress={async () => handleConfirmORDeleteApp()}
              />
              <Appbar.Action
                color="grey" //El Rojo no brega xd
                icon="delete"
                onPress={async () => handleConfirmORDeleteApp()}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
      {/* </Pressable> */}
    </View>
  );
}

export default TableItemAppointments;

const styles = StyleSheet.create({
  cardContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
