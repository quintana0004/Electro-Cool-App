import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors/Colors";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

// --- Dummy Data ---
const DUMMY_DATA = [
  {
    id: 1,
    firstName: "Jan",
    lastName: "Montalvo",
    date: "2022-12-22T21:46:33.206Z",
    totalPrice: 56.7,
    status: "In Draft",
  },
  {
    id: 2,
    firstName: "Jessica",
    lastName: "Quintana",
    date: "2022-12-26T21:46:33.206Z",
    totalPrice: 156.7,
    status: "Paid",
  },
  {
    id: 3,
    firstName: "Luis",
    lastName: "Telemaco",
    date: "2022-12-24T21:46:33.206Z",
    totalPrice: 541.7,
    status: "Pending",
  },
  {
    id: 4,
    firstName: "Hector",
    lastName: "Montalvo",
    date: "2022-12-30T21:46:33.206Z",
    totalPrice: 14048.7,
    status: "Canceled",
  },
];

function TableList() {
  function renderTableItem({ item }) {
    return <TableItem itemData={item} />;
  }

  return (
    <View>
      <View style={styles.listContainer}>
        <FlashList
          ListHeaderComponent={<TableHeader />}
          data={DUMMY_DATA}
          renderItem={renderTableItem}
          estimatedItemSize={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 300,
  },
});

export default TableList;
