import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet } from "react-native";

function TableItem({ itemData }) {
  const { id, firstName, lastName, date, totalPrice, status } = itemData;

  function formattedDate() {
    return new Date(date).toDateString();
  }

  function formattedName() {
    return `${lastName}, ${firstName}`;
  }

  function formattedAmount() {
    return `$${totalPrice}`;
  }

  function renderRowData({ item }) {
    return (
      <View style={{ width: "100%" }}>
        <Text style={{ flexWrap: "nowrap " }}>{item}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={[id, formattedName(), formattedDate(), formattedAmount(), status]}
        renderItem={renderRowData}
        numColumns={6}
        estimatedItemSize={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 50,
    borderWidth: 1.8,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default TableItem;
