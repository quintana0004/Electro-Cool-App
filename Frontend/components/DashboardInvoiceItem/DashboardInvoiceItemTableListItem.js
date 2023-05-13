import { StyleSheet, Text, View } from "react-native";
import { MaskedText } from "react-native-mask-text";
import Colors from "../../constants/Colors/Colors";

function DashboardInvoiceItemTableListItem({ invoiceItemInfo }) {
  const formattedTotalAmount =
    invoiceItemInfo.unitPrice * invoiceItemInfo.quantity * 100;
  const formattedPrice = (invoiceItemInfo.unitPrice * 100)
    .toFixed(2)
    .toString();

  return (
    <View style={styles.container}>
      <View style={styles.descContainer}>
        <View>
          <Text style={styles.descText}>{invoiceItemInfo.description}</Text>
        </View>
        <View style={styles.warrantyContainer}>
          <Text style={styles.warrantyText}>{invoiceItemInfo.warranty}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>
          {invoiceItemInfo.quantity.toString()}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <MaskedText
          type="currency"
          style={styles.priceText}
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          keyboardType="decimal-pad"
        >
          {formattedPrice}
        </MaskedText>
      </View>
      <View style={styles.totalContainer}>
        <MaskedText
          type="currency"
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
        >
          {formattedTotalAmount}
        </MaskedText>
      </View>
    </View>
  );
}

export default DashboardInvoiceItemTableListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    backgroundColor: Colors.brightYellow,
    height: 50,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 0,
  },
  descContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: 200,
    height: 35,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 2,
  },
  descText: {
    minWidth: 100,
  },
  warrantyContainer: {
    width: 80,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.black,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  warrantyText: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: 50,
    height: 35,
    borderRadius: 15,
  },
  quantityText: {
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: 80,
    height: 35,
    borderRadius: 15,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: 80,
    height: 35,
    borderRadius: 15,
  },
});
