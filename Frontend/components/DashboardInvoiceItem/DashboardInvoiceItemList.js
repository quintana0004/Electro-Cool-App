import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DashboardInvoiceItemTableListItem from "./DashboardInvoiceItemTableListItem";

function renderTableItem({ item }) {
  return <DashboardInvoiceItemTableListItem invoiceItemInfo={item} />;
}
function DashboardInvoiceItemList({ invoiceItems }) {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={invoiceItems}
        renderItem={renderTableItem}
      />
    </View>
  );
}

export default DashboardInvoiceItemList;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});
