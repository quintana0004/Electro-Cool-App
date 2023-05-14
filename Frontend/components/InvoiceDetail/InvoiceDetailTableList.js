import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import InvoiceDetailTableItem from "./InvoiceDetailTableItem";

function InvoiceDetailTableList({
  isInvoiceEditable,
  invoiceItems,
  setInvoiceItems,
}) {
  function removeInvoiceItem(key) {
    let filteredData = invoiceItems.filter((item) => item.key !== key);
    setInvoiceItems([...filteredData]);
  }

  function updateInvoiceItems(invoiceItem) {
    let updatedInvoiceItems = invoiceItems.map((item) => {
      if (item.key === invoiceItem.key) {
        return invoiceItem;
      }

      return item;
    });

    setInvoiceItems([...updatedInvoiceItems]);
  }

  function renderTableItem({ item }) {
    return (
      <InvoiceDetailTableItem
        invoiceItemInfo={item}
        removeItem={removeInvoiceItem}
        updateItem={updateInvoiceItems}
        isInvoiceEditable={isInvoiceEditable}
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
