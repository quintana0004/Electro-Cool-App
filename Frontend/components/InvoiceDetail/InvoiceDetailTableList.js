import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import InvoiceDetailTableItem from "./InvoiceDetailTableItem";

function InvoiceDetailTableList({invoiceItems, setInvoiceItems}) {

  invoiceItems.forEach(item => console.log("Initial Invoice Items: ", item.key, item.description));

  // Things Needed:
  // 1. FlatList - Done
  // 2. Setup Render Item Function - Done
  // 4. Ability to remove items - Done
  // 5. Ability to update items
  // 6. Display items

  function removeInvoiceItem(key) {
    console.log("Remove key: ", key);
    console.log("Invoice items before Removal: ", invoiceItems);
    let filteredData = invoiceItems.filter((item) => item.key != key);
    // filteredData = filteredData.map((item, key) => ({...item, key}));
    setInvoiceItems([...filteredData]);
  }

  function updateInvoiceItems(invoiceItem) {
    invoiceItems[invoiceItem.key] = invoiceItem;
    setInvoiceItems([...invoiceItems]);
  }

  function renderTableItem({ item }) {
    return (
      <InvoiceDetailTableItem 
        invoiceItemInfo={item}
        removeItem={removeInvoiceItem}
        updateItem={updateInvoiceItems}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={(item) => item.key}
        data={invoiceItems}
        renderItem={renderTableItem}
      /> 
    </View>
  );
}

export default InvoiceDetailTableList;

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
});
