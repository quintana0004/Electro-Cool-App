import { FlashList } from "@shopify/flash-list";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

function TableList({ tableData }) {
  function renderTableItem({ item }) {
    const itemInfo = {
      id: item.id,
      firstName: item.customer.firstName,
      lastName: item.customer.lastName,
      date: item.createdDate,
      amountTotal: item.amountTotal,
      status: item.status,
    };

    return <TableItem itemData={itemInfo} />;
  }

  return (
    <View style={styles.listContainer}>
      <TableHeader />
      <FlatList data={tableData} renderItem={renderTableItem} estimatedItemSize={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 500,
    width: Dimensions.get("screen").width,
  },
});

export default TableList;
