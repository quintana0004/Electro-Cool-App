import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import TableHeaderOrder from "./TableHeaderOrder";
import TableItemOrder from "./TableItemOrder";

function jobOrderItem(itemData) {
  return (
    <TableItemOrder
      ID={itemData.item.ID}
      date={itemData.item.date}
      firstName={itemData.item.firstName}
      lastName={itemData.item.lastName}
      status={itemData.item.status}
    />
  );
}

function TableListOrder({ data }) {
  return (
    <View style={{ height: 1000, width: Dimensions.get("screen").width }}>
      <TableHeaderOrder />
      <FlatList
        data={data}
        renderItem={jobOrderItem}
        keyExtractor={(item) => item.ID}
      />
    </View>
  );
}

export default TableListOrder;
