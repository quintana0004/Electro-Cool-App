import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";

function InvoiceItemCB() {
  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  return (
    <View>
      <View>
        <Text> Cutomer Invoices </Text>
      </View>
    </View>
  );
}

export default InvoiceItemCB;

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
