import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";

import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

function TableList({ tableData }) {
  function renderTableItem({ item }) {
    return <TableItem itemData={item} />;
  }

  return (
    <View>
      <View style={styles.listContainer}>
        <TableHeader />
        <FlashList data={tableData} renderItem={renderTableItem} estimatedItemSize={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 500,
  },
});

export default TableList;
