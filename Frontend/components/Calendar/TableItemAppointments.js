import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function TableItemAppointments({ itemData }) {
  console.log("ItemData:", itemData);
  const { id, customerName, arrivalDateTime, service } = itemData;

  function DateText() {
    return format(new Date(arrivalDateTime), "MM/dd/yyyy");
  }

  return (
    <View>
      <Pressable onPress={navigateToDetailScreen.bind(this, id)}>
        <View style={styles.container}>
          <View style={{ width: 80 }}>
            <Text style={[{ textAlign: "center" }, styles.boldText]}>{id}</Text>
          </View>
          <View style={{ width: 150 }}>
            <Text style={styles.boldText}>{customerName}</Text>
          </View>
          <View style={{ width: 80 }}>
            <Text style={styles.boldText}>{DateText()}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 55 }}>
            <Text style={styles.boldText}>{service}</Text>
          </View>
        </View>
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
});
