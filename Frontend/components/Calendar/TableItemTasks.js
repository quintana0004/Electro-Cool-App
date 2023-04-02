import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/core";

function TableItemInvoice({ itemData, category }) {
  const { id, title, date } = itemData;
  const navigation = useNavigation();
  console.log(
    "Me apesta el culo y no me bano muy frecuentemente",
    id,
    title,
    date
  );
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
          <Text>{title}</Text>
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
