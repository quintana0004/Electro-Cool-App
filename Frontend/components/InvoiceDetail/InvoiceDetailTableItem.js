import { useMemo, useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { MaskedText, MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors/Colors";
import InvoiceDetailSelect from "./InvoiceDetailSelect";

function InvoiceDetailTableItem({ invoiceItemInfo, removeItem, updateItem }) {
  const [invoiceItem, setInvoiceItem] = useState({
    key: invoiceItemInfo.key,
    description: invoiceItemInfo.description,
    quantity: invoiceItemInfo.quantity,
    unitPrice: invoiceItemInfo.unitPrice,
    warranty: invoiceItemInfo.warranty,
  });

  const formattedTotalAmount = useMemo(() => {
    return invoiceItem.unitPrice * invoiceItem.quantity * 100;  
  }, [invoiceItem.unitPrice, invoiceItem.quantity]);

  const formattedPrice = useMemo(() => {
    return (invoiceItem.unitPrice * 100).toFixed(2).toString();
  }, [invoiceItem.unitPrice]);

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
    const decimalValue = currencyStringToDecimal(value);
    setInvoiceItem({...invoiceItem, unitPrice: decimalValue});
  }

  function handleWarrantyChange(value) {
    setInvoiceItem({...invoiceItem, warranty: value});

    // When warranty is selected send update to parent
    onBlurUpdateInvoiceItem();
  }

  function handleTotalAmountUpdate(item) {
    return (item.unitPrice * invoiceItem.quantity);
  }

  function onBlurUpdateInvoiceItem() {
    invoiceItem.totalPrice = handleTotalAmountUpdate(invoiceItem);
    updateItem(invoiceItem);
  }

  function currencyStringToDecimal(currencyString) {
  // Remove any non-digit characters except for the decimal point
  const cleanedString = currencyString.replace(/[^0-9.]+/g, '');

  // Parse the cleaned string as a floating-point number
  const decimalNumber = parseFloat(cleanedString);

  return decimalNumber;
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
  descText: {
    minWidth: 100,
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
