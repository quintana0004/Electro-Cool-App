import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Status from "../../../Invoices/Status";

function InvoiceItemClientBook({ itemData }) {
  const { id, firstName, lastName, date, amountTotal, status } = itemData;

  function DateText() {
    return format(new Date(date), "MM/dd/yyyy");
  }

  return (
    <View>
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
    </View>
  );
}

export default InvoiceItemClientBook;

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
