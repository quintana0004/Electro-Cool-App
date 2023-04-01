import { useMemo, useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors/Colors";
import InvoiceDetailSelect from "./InvoiceDetailSelect";

// TODO:
// 1. Create input for description
// 2. Better update handeling for invoiceItemData
// 3. Send data to parent on blur

function InvoiceDetailTableItem({ invoiceItemInfo, removeItem, updateItem }) {
  const [invoiceItem, setInvoiceItem] = useState({
    description: invoiceItemInfo.description,
    quantity: invoiceItemInfo.quantity,
    price: invoiceItemInfo.unitPrice,
    warranty: invoiceItemInfo.warranty,
  });

  const formattedTotalAmount = useMemo(() => {
    return invoiceItem.price * invoiceItem.quantity * 100;  
  }, [invoiceItem.price, invoiceItem.quantity]);

  const formattedPrice = useMemo(() => {
    return (invoiceItem.price * 100).toFixed(2).toString();
  }, [invoiceItem.price]);

  function handleRemoveItem() {
    removeItem(invoiceItemInfo.key);
  }

  function handleDescriptionChange(value) {
    setInvoiceItem({...invoiceItem, description: value});
  }

  function handleQuantityChange(value) {
    setInvoiceItem({...invoiceItem, quantity: Number(value)});
  }

  function handlePriceChange(value) {
    const extractedValue = value.replace('$', '');
    setInvoiceItem({...invoiceItem, price: extractedValue});
  }

  function handleWarrantyChange(value) {
    setInvoiceItem({...invoiceItem, warranty: value});

    // When warranty is selected send update to parent
    onBlurUpdateInvoiceItem();
  }

  function onBlurUpdateInvoiceItem() {
    updateItem(invoiceItem);
  }

  return (
    <View style={styles.container}>
      <View style={styles.descContainer}>
        <View>
          <TextInput
            style={styles.descText}
            value={invoiceItem.description}
            onChangeText={handleDescriptionChange}
            onBlur={onBlurUpdateInvoiceItem}
          />
        </View>
        <InvoiceDetailSelect value={invoiceItem.warranty} onSelect={handleWarrantyChange}/>
      </View>
      <View style={styles.quantityContainer}>
        <TextInput 
          style={styles.quantityText}
          value={invoiceItem.quantity.toString()}
          keyboardType="decimal-pad"
          onChangeText={handleQuantityChange}
          onBlur={onBlurUpdateInvoiceItem}
        />
      </View>
      <View style={styles.priceContainer}>
        <MaskedTextInput
          type="currency"
          defaultValue={formattedPrice}
          style={styles.priceText}
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={handlePriceChange}
          onBlur={onBlurUpdateInvoiceItem}
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
          {formattedTotalAmount}
        </MaskedText>
      </View>
      <View>
        <Pressable onPress={handleRemoveItem}> 
          <Ionicons name="remove-circle-sharp" size={30} color="black" />
        </Pressable>
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
    zIndex: 0,
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
    paddingRight: 5,
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
