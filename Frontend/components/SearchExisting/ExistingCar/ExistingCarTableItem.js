import { View, Text, Pressable, StyleSheet } from "react-native";
import CheckBox from "../../UI/Checkbox";

function ExistingCarItemTableItem({ itemData, onSelected }) {
  const { id, brand, model, year, licensePlate } = itemData;

  return (
    <View>
      <Pressable>
        <View style={styles.container}>
          <View style={{ width: 80, marginLeft: 30 }}>
            <Text style={styles.boldText}>{brand}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 30 }}>
            <Text style={styles.boldText}>{model}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 25 }}>
            <Text style={styles.boldText}>{year}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 30 }}>
            <Text style={styles.boldText}>{licensePlate}</Text>
          </View>
          <View style={{ width: 80, marginLeft: 80 }}>
            <CheckBox id={id} checkValue={itemData.selected} onCheck={onSelected} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExistingCarItemTableItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1.8,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});
