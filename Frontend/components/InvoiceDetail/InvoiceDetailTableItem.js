import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors/Colors";
import { useState } from "react";

function InvoiceDetailTableItem({ description, price, quantity }) {
  const [invoiceItem, setInvoiceItem] = useState({
    description: description,
    price: price,
    quantity: quantity,
  });

  function handlePriceChange(formattedValue) {
    const extractedValue = formattedValue.replace('$', '');
    setInvoiceItem({...invoiceItem, price: extractedValue});
  }

  function handleQuantityChange(value) {
    setInvoiceItem({...invoiceItem, quantity: Number(value)});
  }

  function getTotalAmount() {
    let total = invoiceItem.price * invoiceItem.quantity * 100;
    return total;
  }

  function getPrice() {
    let price = (invoiceItem.price * 100).toFixed(2).toString();
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
        <TextInput 
          style={styles.quantityText}
          value={invoiceItem.quantity.toString()}
          keyboardType="decimal-pad"
          onChangeText={handleQuantityChange}
        />
      </View>
      <View style={styles.priceContainer}>
        <MaskedTextInput
          type="currency"
          value={getPrice()}
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
  quantityText: {
    textAlign: "center"
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
