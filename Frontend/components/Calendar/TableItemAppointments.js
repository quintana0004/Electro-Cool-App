import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import { format } from "date-fns";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Card } from "react-native-paper";
import Colors from "../../constants/Colors/Colors";
import { Appbar } from "react-native-paper";
import { httpDeleteAppointment } from "../../api/appointments.api";
import { useCalendarStore } from "../../Store/calendarStore";

function TableItemAppointments({ itemData }) {
  console.log("ItemData:", itemData);
  const { id, customername, arrivalDateTime, service, brand, licensePlate } =
    itemData;

  const setReloadCalendarList = useCalendarStore(
    (state) => state.setReloadCalendarList
  );

  function DateText() {
    return format(new Date(arrivalDateTime), "HH:mm");
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
      <Pressable onPress={() => console.log("PRESSED ITEM")}>
        <Card
          style={{
            marginBottom: 10,
            width: 500,
            borderColor: Colors.lightGreyDark,
            borderWidth: 1,
            backgroundColor: Colors.white,
          }}
        >
          <Card.Content>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.boldText}>{customername}</Text>
                <Text style={styles.boldText}>{DateText()}</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.boldText}>{service}</Text>
                <Text style={styles.boldText}>
                  {brand},{licensePlate}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Appbar.Action
                  icon="delete"
                  onPress={async () => handleConfirmORDeleteApp()}
                />
                <Appbar.Action
                  icon="check-circle"
                  onPress={async () => handleConfirmORDeleteApp()}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
}

export default TableItemAppointments;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1.8,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  Content: {
    width: 20,
  },
});
