import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Status from "./Status";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/core";

function TableItemInvoice({ itemData, category }) {
  const { id, firstName, lastName, date, amountTotal, status } = itemData;
  const navigation = useNavigation();

  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  function navigateToDetailScreen(itemId) {
    if (category === "Appointment") {
      navigation.navigate("AppointmentDetail", { itemId });
    } else {
      navigation.navigate("TaskDetail", { itemId });
    }
  }

  return (
    <View>
      <Pressable onPress={navigateToDetailScreen.bind(this, id)}>
        <View style={styles.container}>
          <View style={{ width: 80 }}>
            <Text style={[{ textAlign: "center" }, styles.boldText]}>{id}</Text>
          </View>
          <View style={{ width: 150 }}>
            <Text style={styles.boldText}>
              {lastName}, {firstName}
            </Text>
          </View>
          <View style={{ width: 80 }}>
            <Text style={styles.boldText}>{DateText()}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 55 }}>
            <Text style={styles.boldText}>${amountTotal}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 30 }}>
            <Status parentTextStyles={styles.boldText} status={status} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default TableItemInvoice;

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
});
