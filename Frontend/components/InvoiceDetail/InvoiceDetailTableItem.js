import { View, Text, StyleSheet } from "react-native";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";
import { useState } from "react";

function InvoiceDetailTableItem({ description, price, quantity }) {
  console.log("Props: ", description, price, quantity);
  const [invoiceItem, setInvoiceItem] = useState({
    description: description,
    price: price,
    quantity: quantity,
  });

  function handlePriceChange(formattedValue) {
    console.log("formattedValue: ", formattedValue);
  }

  function getTotalAmount() {
    let total = invoiceItem.price * invoiceItem.quantity * 100;
    return total;
  }

  function getPrice() {
    let price = invoiceItem.price * 100;
    console.log("price: ", price);
    return price;
  }

  return (
    <View style={styles.container}>
      <View style={styles.descContainer}>
        <View style={styles.descTextContainer}>
          <Text style={styles.descText}>Botellas Sample</Text>
        </View>
        <View style={styles.selectContainer}>
          <Text style={styles.selectText}>SELECT</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{invoiceItem.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <MaskedTextInput
          type="currency"
          value={23997}
          style={styles.priceText}
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={handlePriceChange}
          keyboardType="decimal-pad"
        />
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
          {getTotalAmount()}
        </MaskedText>
      </View>
      <View style={styles.deleteContainer}>
        <Ionicons name="remove-circle-sharp" size={30} color="black" />
      </View>
    </View>
  );
}

export default InvoiceDetailTableItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.brightYellow,
    height: 50,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  descContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: 200,
    height: 35,
    borderRadius: 15,
    paddingHorizontal: 10,
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
